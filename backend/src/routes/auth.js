const express = require('express');
const jwt = require('jsonwebtoken');
const { db } = require('../db');
const { users, notifications } = require('../schema');
const { eq } = require('drizzle-orm');
const { generateToken, JWT_SECRET } = require('../middleware/auth');

const router = express.Router();

const { OAuth2Client } = require('google-auth-library');
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'mock-client-id';
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

router.post('/google', async (req, res) => {
  try {
    const { idToken, email: emailFromClient, name: nameFromClient, picture: pictureFromClient } = req.body;
    
    let email = emailFromClient;
    let name = nameFromClient;
    let picture = pictureFromClient;
    let googleId = 'mock-google-id';

    // Verify Google Token if CLIENT_ID is present and not a mock
    if (GOOGLE_CLIENT_ID !== 'mock-client-id') {
      try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: GOOGLE_CLIENT_ID, 
        });
        const payload = ticket.getPayload();
        email = payload.email;
        name = payload.name;
        picture = payload.picture;
        googleId = payload.sub;
      } catch (verifyError) {
        console.error('Google Token Verify Error:', verifyError);
        return res.status(401).json({ error: 'Invalid Google Token' });
      }
    } else {
        // [WARNING] In mock mode, we still trust the client for now to allow development proceeding without keys.
        // In production, this block MUST be removed.
        console.warn('Running in MOCK AUTH mode. Trusting client values.');
    }

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    let [user] = await db.select().from(users).where(eq(users.email, email));
    
    if (!user) {
      const [newUser] = await db.insert(users).values({
        email,
        name: name || 'User',
        picture: picture || '',
        googleId: googleId || '',
        credits: 50,
        plan: 'free'
      }).returning();
      user = newUser;

      await db.insert(notifications).values({
        userId: user.id,
        title: 'Welcome to RealCheck!',
        message: 'You have 50 free credits to get started. Scan products or create designs!',
        type: 'welcome'
      });
    } else {
      await db.update(users).set({
        picture: picture || user.picture,
        updatedAt: new Date()
      }).where(eq(users.id, user.id));
    }

    const token = generateToken(user.id, user.email);

    res.json({ 
      token, 
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        picture: user.picture,
        credits: user.credits,
        plan: user.plan
      }
    });
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

router.post('/verify', async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const [user] = await db.select().from(users).where(eq(users.id, decoded.userId));
    if (!user) {
      return res.status(401).json({ valid: false, error: 'User not found' });
    }

    res.json({ 
      valid: true, 
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        picture: user.picture,
        credits: user.credits,
        plan: user.plan
      }
    });
  } catch (error) {
    res.status(401).json({ valid: false, error: 'Invalid token' });
  }
});

router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

module.exports = router;
