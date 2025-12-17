const express = require('express');
const { db } = require('../db');
const { users } = require('../schema');
const { eq } = require('drizzle-orm');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    res.json({
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
      picture: req.user.picture,
      credits: req.user.credits,
      plan: req.user.plan,
      createdAt: req.user.createdAt
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to get profile' });
  }
});

router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { name, picture } = req.body;
    
    const updateData = { updatedAt: new Date() };
    if (name) updateData.name = name;
    if (picture) updateData.picture = picture;

    const [updatedUser] = await db.update(users)
      .set(updateData)
      .where(eq(users.id, req.userId))
      .returning();

    res.json({ 
      success: true, 
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        picture: updatedUser.picture,
        credits: updatedUser.credits,
        plan: updatedUser.plan
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

router.delete('/account', authMiddleware, async (req, res) => {
  try {
    await db.delete(users).where(eq(users.id, req.userId));
    res.json({ success: true, message: 'Account deleted' });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({ error: 'Failed to delete account' });
  }
});

module.exports = router;
