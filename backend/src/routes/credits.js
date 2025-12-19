const express = require('express');
const { db } = require('../db');
const { users, creditTransactions, subscriptions } = require('../schema');
const { eq, desc } = require('drizzle-orm');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

const CREDIT_PACKAGES = [
  { id: 'pack_10', credits: 10, price: 2.99, popular: false },
  { id: 'pack_50', credits: 50, price: 9.99, popular: true },
  { id: 'pack_100', credits: 100, price: 17.99, popular: false },
  { id: 'pack_500', credits: 500, price: 79.99, popular: false }
];

const SUBSCRIPTION_PLANS = [
  { id: 'free', name: 'Free', price: 0, creditsPerMonth: 10, features: ['10 scans/month', 'Basic AI detection', 'Standard support'] },
  { id: 'pro', name: 'Pro', price: 9.99, creditsPerMonth: 100, features: ['100 scans/month', 'Advanced AI detection', 'Priority support', 'Brand kits'] },
  { id: 'business', name: 'Business', price: 29.99, creditsPerMonth: 500, features: ['500 scans/month', 'Enterprise AI', '24/7 support', 'Unlimited brand kits', 'API access'] }
];

router.get('/balance', authMiddleware, async (req, res) => {
  try {
    const [subscription] = await db.select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, req.userId))
      .orderBy(desc(subscriptions.createdAt))
      .limit(1);

    res.json({
      credits: req.user.credits,
      plan: req.user.plan,
      subscription: subscription || null,
      nextRenewal: subscription ? subscription.currentPeriodEnd : null
    });
  } catch (error) {
    console.error('Get balance error:', error);
    res.status(500).json({ error: 'Failed to get balance' });
  }
});

router.get('/packages', (req, res) => {
  res.json(CREDIT_PACKAGES);
});

router.get('/plans', (req, res) => {
  res.json(SUBSCRIPTION_PLANS);
});

const Stripe = require('stripe');
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

// Initialize Stripe if key exists
const stripe = STRIPE_SECRET_KEY ? Stripe(STRIPE_SECRET_KEY) : null;

router.post('/create-payment-intent', authMiddleware, async (req, res) => {
  try {
    const { packageId } = req.body;
    const creditPackage = CREDIT_PACKAGES.find(p => p.id === packageId);
    if (!creditPackage) return res.status(400).json({ error: 'Invalid package' });

    if (!stripe) {
      console.warn('Using MOCK Stripe Logic');
      return res.json({
        clientSecret: 'mock_secret_' + Math.random().toString(36),
        mock: true
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(creditPackage.price * 100), // cents
      currency: 'usd',
      metadata: { userId: req.userId, packageId: creditPackage.id }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: 'Payment initialization failed' });
  }
});

router.post('/initialize-transaction', authMiddleware, async (req, res) => {
  try {
    const { packageId, email } = req.body;
    const creditPackage = CREDIT_PACKAGES.find(p => p.id === packageId);
    if (!creditPackage) return res.status(400).json({ error: 'Invalid package' });

    if (!PAYSTACK_SECRET_KEY) {
      console.warn('Using MOCK Paystack Logic');
      return res.json({
        authorization_url: 'https://checkout.paystack.com/mock-page',
        access_code: 'mock_access_' + Math.random().toString(36),
        reference: 'mock_ref_' + Date.now(),
        mock: true
      });
    }

    // Real Paystack logic would use axios to call https://api.paystack.co/transaction/initialize
    // Placeholder for brevity as axios isn't imported here yet
    res.json({ error: 'Paystack integration pending axios import' });

  } catch (error) {
    console.error('Paystack error:', error);
    res.status(500).json({ error: 'Payment initialization failed' });
  }
});

// Original /purchase is used for "Simulating" success in mock mode or webhook callback
router.post('/purchase', authMiddleware, async (req, res) => {
  try {
    const { packageId, paymentMethod, paymentId } = req.body;

    // In a real app, we would VERIFY paymentId with Stripe/Paystack here before awarding credits

    const creditPackage = CREDIT_PACKAGES.find(p => p.id === packageId);

    if (!creditPackage) {
      return res.status(400).json({ error: 'Invalid package' });
    }

    const newCredits = req.user.credits + creditPackage.credits;

    await db.update(users)
      .set({ credits: newCredits, updatedAt: new Date() })
      .where(eq(users.id, req.userId));

    await db.insert(creditTransactions).values({
      userId: req.userId,
      amount: creditPackage.credits,
      action: 'purchase',
      description: `Purchased ${creditPackage.credits} credits`,
      balanceAfter: newCredits
    });

    res.json({
      success: true,
      credits: newCredits,
      purchased: creditPackage.credits,
      message: `Successfully purchased ${creditPackage.credits} credits`
    });
  } catch (error) {
    console.error('Purchase credits error:', error);
    res.status(500).json({ error: 'Failed to purchase credits' });
  }
});

router.post('/subscribe', authMiddleware, async (req, res) => {
  try {
    const { planId, paymentMethod } = req.body;

    const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
    if (!plan) {
      return res.status(400).json({ error: 'Invalid plan' });
    }

    const now = new Date();
    const nextMonth = new Date(now);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    const [subscription] = await db.insert(subscriptions).values({
      userId: req.userId,
      plan: plan.id,
      status: 'active',
      creditsPerMonth: plan.creditsPerMonth,
      pricePerMonth: plan.price.toString(),
      currentPeriodStart: now,
      currentPeriodEnd: nextMonth
    }).returning();

    const newCredits = req.user.credits + plan.creditsPerMonth;

    await db.update(users)
      .set({
        plan: plan.id,
        credits: newCredits,
        updatedAt: new Date()
      })
      .where(eq(users.id, req.userId));

    await db.insert(creditTransactions).values({
      userId: req.userId,
      amount: plan.creditsPerMonth,
      action: 'subscription',
      description: `${plan.name} subscription - ${plan.creditsPerMonth} credits`,
      balanceAfter: newCredits
    });

    res.json({
      success: true,
      subscription,
      credits: newCredits,
      plan: plan.name
    });
  } catch (error) {
    console.error('Subscribe error:', error);
    res.status(500).json({ error: 'Failed to subscribe' });
  }
});

router.get('/history', authMiddleware, async (req, res) => {
  try {
    const transactions = await db.select()
      .from(creditTransactions)
      .where(eq(creditTransactions.userId, req.userId))
      .orderBy(desc(creditTransactions.createdAt))
      .limit(50);

    res.json(transactions);
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({ error: 'Failed to get history' });
  }
});

router.post('/deduct', authMiddleware, async (req, res) => {
  try {
    const { amount, action } = req.body;
    const deductAmount = amount || 1;

    if (req.user.credits < deductAmount) {
      return res.status(402).json({ error: 'Insufficient credits' });
    }

    const newCredits = req.user.credits - deductAmount;

    await db.update(users)
      .set({ credits: newCredits, updatedAt: new Date() })
      .where(eq(users.id, req.userId));

    await db.insert(creditTransactions).values({
      userId: req.userId,
      amount: -deductAmount,
      action: action || 'usage',
      description: `Credits used: ${action || 'general usage'}`,
      balanceAfter: newCredits
    });

    res.json({
      success: true,
      newBalance: newCredits,
      action
    });
  } catch (error) {
    console.error('Deduct credits error:', error);
    res.status(500).json({ error: 'Failed to deduct credits' });
  }
});

module.exports = router;
