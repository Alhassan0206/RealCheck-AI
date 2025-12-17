const express = require('express');
const { db } = require('../db');
const { brandKits } = require('../schema');
const { eq, desc } = require('drizzle-orm');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const userBrandKits = await db.select()
      .from(brandKits)
      .where(eq(brandKits.userId, req.userId))
      .orderBy(desc(brandKits.createdAt));

    res.json(userBrandKits);
  } catch (error) {
    console.error('Get brand kits error:', error);
    res.status(500).json({ error: 'Failed to get brand kits' });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const [brandKit] = await db.select()
      .from(brandKits)
      .where(eq(brandKits.id, parseInt(req.params.id)));

    if (!brandKit || brandKit.userId !== req.userId) {
      return res.status(404).json({ error: 'Brand kit not found' });
    }

    res.json(brandKit);
  } catch (error) {
    console.error('Get brand kit error:', error);
    res.status(500).json({ error: 'Failed to get brand kit' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, logoUrl, primaryColor, secondaryColor, accentColor, fontFamily, isDefault } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    if (isDefault) {
      await db.update(brandKits)
        .set({ isDefault: false })
        .where(eq(brandKits.userId, req.userId));
    }

    const [newBrandKit] = await db.insert(brandKits).values({
      userId: req.userId,
      name,
      logoUrl: logoUrl || null,
      primaryColor: primaryColor || '#4f46e5',
      secondaryColor: secondaryColor || '#1e293b',
      accentColor: accentColor || '#10b981',
      fontFamily: fontFamily || 'Inter',
      isDefault: isDefault || false
    }).returning();

    res.status(201).json(newBrandKit);
  } catch (error) {
    console.error('Create brand kit error:', error);
    res.status(500).json({ error: 'Failed to create brand kit' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name, logoUrl, primaryColor, secondaryColor, accentColor, fontFamily, isDefault } = req.body;
    
    const [brandKit] = await db.select()
      .from(brandKits)
      .where(eq(brandKits.id, parseInt(req.params.id)));

    if (!brandKit || brandKit.userId !== req.userId) {
      return res.status(404).json({ error: 'Brand kit not found' });
    }

    if (isDefault) {
      await db.update(brandKits)
        .set({ isDefault: false })
        .where(eq(brandKits.userId, req.userId));
    }

    const updateData = { updatedAt: new Date() };
    if (name !== undefined) updateData.name = name;
    if (logoUrl !== undefined) updateData.logoUrl = logoUrl;
    if (primaryColor !== undefined) updateData.primaryColor = primaryColor;
    if (secondaryColor !== undefined) updateData.secondaryColor = secondaryColor;
    if (accentColor !== undefined) updateData.accentColor = accentColor;
    if (fontFamily !== undefined) updateData.fontFamily = fontFamily;
    if (isDefault !== undefined) updateData.isDefault = isDefault;

    const [updatedBrandKit] = await db.update(brandKits)
      .set(updateData)
      .where(eq(brandKits.id, parseInt(req.params.id)))
      .returning();

    res.json(updatedBrandKit);
  } catch (error) {
    console.error('Update brand kit error:', error);
    res.status(500).json({ error: 'Failed to update brand kit' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const [brandKit] = await db.select()
      .from(brandKits)
      .where(eq(brandKits.id, parseInt(req.params.id)));

    if (!brandKit || brandKit.userId !== req.userId) {
      return res.status(404).json({ error: 'Brand kit not found' });
    }

    await db.delete(brandKits).where(eq(brandKits.id, parseInt(req.params.id)));
    res.json({ success: true, message: 'Brand kit deleted' });
  } catch (error) {
    console.error('Delete brand kit error:', error);
    res.status(500).json({ error: 'Failed to delete brand kit' });
  }
});

module.exports = router;
