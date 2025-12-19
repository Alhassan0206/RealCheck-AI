const express = require('express');
const { db } = require('../db');
const { scans, users, creditTransactions } = require('../schema');
const { eq, desc } = require('drizzle-orm');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const userScans = await db.select()
      .from(scans)
      .where(eq(scans.userId, req.userId))
      .orderBy(desc(scans.createdAt))
      .limit(50);

    res.json(userScans);
  } catch (error) {
    console.error('Get scans error:', error);
    res.status(500).json({ error: 'Failed to get scans' });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const [scan] = await db.select()
      .from(scans)
      .where(eq(scans.id, parseInt(req.params.id)));

    if (!scan || scan.userId !== req.userId) {
      return res.status(404).json({ error: 'Scan not found' });
    }

    res.json(scan);
  } catch (error) {
    console.error('Get scan error:', error);
    res.status(500).json({ error: 'Failed to get scan' });
  }
});

const axios = require('axios');
const HIVE_API_KEY = process.env.HIVE_API_KEY;

router.post('/analyze', authMiddleware, async (req, res) => {
  try {
    const { imageUrl, imageData, category } = req.body;

    if (req.user.credits < 1) {
      return res.status(402).json({ error: 'Insufficient credits' });
    }

    let isAuthentic = false;
    let confidence = 0;
    let metadata = { category: category || 'general', analyzedAt: new Date().toISOString() };

    if (!HIVE_API_KEY) {
      console.warn('Using MOCK Hive AI Logic (No API Key found)');
      // Mock logic
      // Simulate 10% error rate for Screen 30 testing
      if (Math.random() < 0.1) {
        return res.status(503).json({ error: 'Scan timed out. Please try again.', code: 'SCAN_TIMEOUT' });
      }

      isAuthentic = Math.random() > 0.3; // 70% real, 30% fake
      confidence = isAuthentic
        ? Math.floor(Math.random() * 20) + 80 // 80-99%
        : Math.floor(Math.random() * 30) + 10; // 10-39%
    } else {
      // Real Hive AI Call
      try {
        // Example Hive API call (conceptual - requires specific endpoint docs)
        const response = await axios.post('https://api.thehive.ai/api/v2/task/sync', {
          image_url: imageUrl
        }, {
          headers: { 'Authorization': `token ${HIVE_API_KEY}` }
        });
        // process response...
        // logic placeholder for real response parsing
        isAuthentic = true;
        confidence = 95;
      } catch (apiError) {
        console.error('Hive AI connection failed:', apiError);
        return res.status(503).json({ error: 'AI Service Unavailable', code: 'SCAN_ERROR' });
      }
    }

    const [newScan] = await db.insert(scans).values({
      userId: req.userId,
      imageUrl: imageUrl || '',
      result: isAuthentic ? 'authentic' : 'fake',
      confidence,
      metadata
    }).returning();

    const newCredits = req.user.credits - 1;
    await db.update(users)
      .set({ credits: newCredits, updatedAt: new Date() })
      .where(eq(users.id, req.userId));

    await db.insert(creditTransactions).values({
      userId: req.userId,
      amount: -1,
      action: 'scan',
      description: `Authenticity scan - ${newScan.result}`,
      balanceAfter: newCredits
    });

    res.json({
      ...newScan,
      creditsRemaining: newCredits
    });
  } catch (error) {
    console.error('Analyze error:', error);
    res.status(500).json({ error: 'Failed to analyze image' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const [scan] = await db.select()
      .from(scans)
      .where(eq(scans.id, parseInt(req.params.id)));

    if (!scan || scan.userId !== req.userId) {
      return res.status(404).json({ error: 'Scan not found' });
    }

    await db.delete(scans).where(eq(scans.id, parseInt(req.params.id)));
    res.json({ success: true, message: 'Scan deleted' });
  } catch (error) {
    console.error('Delete scan error:', error);
    res.status(500).json({ error: 'Failed to delete scan' });
  }
});

module.exports = router;
