const express = require('express');
const router = express.Router();

router.get('/balance', (req, res) => {
  res.json({
    credits: 44,
    usedThisMonth: 56,
    plan: 'Pro',
    nextRenewal: '2025-01-15'
  });
});

router.post('/deduct', (req, res) => {
  const { amount, action } = req.body;
  res.json({
    success: true,
    newBalance: 44 - (amount || 1),
    action
  });
});

router.get('/history', (req, res) => {
  res.json([
    { id: '1', action: 'scan', amount: -1, date: '2025-12-15T10:30:00Z' },
    { id: '2', action: 'generate', amount: -5, date: '2025-12-14T14:20:00Z' },
    { id: '3', action: 'purchase', amount: 50, date: '2025-12-01T00:00:00Z' }
  ]);
});

module.exports = router;
