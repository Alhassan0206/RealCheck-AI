const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'realcheck-secret-key';

const users = new Map();

router.post('/google', async (req, res) => {
  try {
    const { idToken, email, name, picture } = req.body;
    
    let user = users.get(email);
    if (!user) {
      user = {
        id: Date.now().toString(),
        email,
        name: name || 'User',
        picture: picture || '',
        credits: 50,
        plan: 'free',
        createdAt: new Date().toISOString()
      };
      users.set(email, user);
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, user });
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

router.post('/verify', async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.get(decoded.email);
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    res.json({ valid: true, user });
  } catch (error) {
    res.status(401).json({ valid: false, error: 'Invalid token' });
  }
});

module.exports = router;
