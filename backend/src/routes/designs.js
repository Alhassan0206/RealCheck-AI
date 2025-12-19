const express = require('express');
const { db } = require('../db');
const { designs, users, creditTransactions, brandKits } = require('../schema');
const { eq, desc } = require('drizzle-orm');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const userDesigns = await db.select()
      .from(designs)
      .where(eq(designs.userId, req.userId))
      .orderBy(desc(designs.createdAt))
      .limit(50);

    res.json(userDesigns);
  } catch (error) {
    console.error('Get designs error:', error);
    res.status(500).json({ error: 'Failed to get designs' });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const [design] = await db.select()
      .from(designs)
      .where(eq(designs.id, parseInt(req.params.id)));

    if (!design || design.userId !== req.userId) {
      return res.status(404).json({ error: 'Design not found' });
    }

    res.json(design);
  } catch (error) {
    console.error('Get design error:', error);
    res.status(500).json({ error: 'Failed to get design' });
  }
});

const axios = require('axios');
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
const REMOVE_BG_API_KEY = process.env.REMOVE_BG_API_KEY;

router.post('/generate', authMiddleware, async (req, res) => {
  try {
    const { prompt, templateId, brandKitId, type, provider } = req.body;
    const creditCost = 5;

    if (req.user.credits < creditCost) {
      return res.status(402).json({ error: 'Insufficient credits' });
    }

    let brandKit = null;
    if (brandKitId) {
      [brandKit] = await db.select()
        .from(brandKits)
        .where(eq(brandKits.id, brandKitId));
    }

    let imageUrl = 'https://via.placeholder.com/400x600?text=AI+Generated+Design';

    // AI Generation Logic
    if (provider === 'openai' && OPENAI_API_KEY) {
      try {
        const response = await axios.post('https://api.openai.com/v1/images/generations', {
          prompt: prompt,
          n: 1,
          size: "1024x1024"
        }, {
          headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}` }
        });
        imageUrl = response.data.data[0].url;
      } catch (e) {
        console.error('OpenAI Error', e);
        return res.status(503).json({ error: 'Design generation failed' });
      }
    } else if (REPLICATE_API_TOKEN) {
      // Replicate logic placeholder
      console.log('Using Replicate (Placeholder)');
    } else {
      console.warn('Using MOCK Design Logic');
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    const [newDesign] = await db.insert(designs).values({
      userId: req.userId,
      title: prompt ? prompt.substring(0, 50) : 'New Design',
      type: type || 'poster',
      prompt,
      templateId,
      brandKitId: brandKitId || null,
      status: 'completed',
      imageUrl: imageUrl
    }).returning();

    const newCredits = req.user.credits - creditCost;
    await db.update(users)
      .set({ credits: newCredits, updatedAt: new Date() })
      .where(eq(users.id, req.userId));

    await db.insert(creditTransactions).values({
      userId: req.userId,
      amount: -creditCost,
      action: 'design_generation',
      description: `AI design generated: ${newDesign.title}`,
      balanceAfter: newCredits
    });

    res.json({
      ...newDesign,
      creditsRemaining: newCredits
    });
  } catch (error) {
    console.error('Generate design error:', error);
    res.status(500).json({ error: 'Failed to generate design' });
  }
});

router.post('/remove-bg', authMiddleware, async (req, res) => {
  try {
    const { imageUrl } = req.body;
    // Cost: 2 credits
    if (req.user.credits < 2) return res.status(402).json({ error: 'Insufficient credits' });

    let processedUrl = imageUrl;

    if (REMOVE_BG_API_KEY) {
      // Real remove.bg logic would go here
      // const response = await axios.post(...)
    } else {
      console.warn('Using MOCK Remove BG Logic');
      // Just return same URL or a transparent placeholder
      processedUrl = imageUrl;
    }

    const newCredits = req.user.credits - 2;
    await db.update(users).set({ credits: newCredits }).where(eq(users.id, req.userId));
    await db.insert(creditTransactions).values({
      userId: req.userId,
      amount: -2,
      action: 'remove_bg',
      description: `Background removal`,
      balanceAfter: newCredits
    });

    res.json({ success: true, imageUrl: processedUrl, creditsRemaining: newCredits });

  } catch (error) {
    console.error('Remove BG error:', error);
    res.status(500).json({ error: 'Failed to remove background' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, status, imageUrl } = req.body;

    const [design] = await db.select()
      .from(designs)
      .where(eq(designs.id, parseInt(req.params.id)));

    if (!design || design.userId !== req.userId) {
      return res.status(404).json({ error: 'Design not found' });
    }

    const updateData = { updatedAt: new Date() };
    if (title) updateData.title = title;
    if (status) updateData.status = status;
    if (imageUrl) updateData.imageUrl = imageUrl;

    const [updatedDesign] = await db.update(designs)
      .set(updateData)
      .where(eq(designs.id, parseInt(req.params.id)))
      .returning();

    res.json(updatedDesign);
  } catch (error) {
    console.error('Update design error:', error);
    res.status(500).json({ error: 'Failed to update design' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const [design] = await db.select()
      .from(designs)
      .where(eq(designs.id, parseInt(req.params.id)));

    if (!design || design.userId !== req.userId) {
      return res.status(404).json({ error: 'Design not found' });
    }

    await db.delete(designs).where(eq(designs.id, parseInt(req.params.id)));
    res.json({ success: true, message: 'Design deleted' });
  } catch (error) {
    console.error('Delete design error:', error);
    res.status(500).json({ error: 'Failed to delete design' });
  }
});

module.exports = router;
