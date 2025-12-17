const express = require('express');
const router = express.Router();

router.get('/profile', (req, res) => {
  res.json({
    id: '1',
    name: 'Alex Morgan',
    email: 'alex@example.com',
    picture: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGZLwCW3ZmHkpW1U0tZxFQKPXY6ywdm0L4o5TwunpzG6J_JFM8ygD5mNpzieojlIFA3Uy7DsniO2rnIGszGYjj-TB1OGRRWNLhhInQdpceDe2uhC91uI8MX2UY7--pNGqEj2liZBYzD5DBlyh6JT43XsXGC7DTIW__WhgmY_I2CXdtF25nOJqtuC5tGhvWBNQaal1iNNUcnrCJKUOm6oPruyk-uKg6WCKr0bcloo2rDxJt-hlnxPjtD0AUZs1IOccRNWsJLc2sVz4',
    credits: 44,
    plan: 'Pro',
    createdAt: '2024-01-15'
  });
});

router.put('/profile', (req, res) => {
  const { name, email } = req.body;
  res.json({ success: true, message: 'Profile updated' });
});

module.exports = router;
