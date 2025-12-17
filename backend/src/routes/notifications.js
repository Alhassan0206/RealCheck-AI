const express = require('express');
const { db } = require('../db');
const { notifications } = require('../schema');
const { eq, desc, and } = require('drizzle-orm');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const userNotifications = await db.select()
      .from(notifications)
      .where(eq(notifications.userId, req.userId))
      .orderBy(desc(notifications.createdAt))
      .limit(50);

    res.json(userNotifications);
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ error: 'Failed to get notifications' });
  }
});

router.get('/unread-count', authMiddleware, async (req, res) => {
  try {
    const unreadNotifications = await db.select()
      .from(notifications)
      .where(and(
        eq(notifications.userId, req.userId),
        eq(notifications.isRead, false)
      ));

    res.json({ count: unreadNotifications.length });
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({ error: 'Failed to get unread count' });
  }
});

router.put('/:id/read', authMiddleware, async (req, res) => {
  try {
    const [notification] = await db.select()
      .from(notifications)
      .where(eq(notifications.id, parseInt(req.params.id)));

    if (!notification || notification.userId !== req.userId) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    const [updatedNotification] = await db.update(notifications)
      .set({ isRead: true })
      .where(eq(notifications.id, parseInt(req.params.id)))
      .returning();

    res.json(updatedNotification);
  } catch (error) {
    console.error('Mark read error:', error);
    res.status(500).json({ error: 'Failed to mark as read' });
  }
});

router.put('/read-all', authMiddleware, async (req, res) => {
  try {
    await db.update(notifications)
      .set({ isRead: true })
      .where(eq(notifications.userId, req.userId));

    res.json({ success: true, message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Mark all read error:', error);
    res.status(500).json({ error: 'Failed to mark all as read' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const [notification] = await db.select()
      .from(notifications)
      .where(eq(notifications.id, parseInt(req.params.id)));

    if (!notification || notification.userId !== req.userId) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    await db.delete(notifications).where(eq(notifications.id, parseInt(req.params.id)));
    res.json({ success: true, message: 'Notification deleted' });
  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({ error: 'Failed to delete notification' });
  }
});

router.delete('/', authMiddleware, async (req, res) => {
  try {
    await db.delete(notifications).where(eq(notifications.userId, req.userId));
    res.json({ success: true, message: 'All notifications cleared' });
  } catch (error) {
    console.error('Clear notifications error:', error);
    res.status(500).json({ error: 'Failed to clear notifications' });
  }
});

module.exports = router;
