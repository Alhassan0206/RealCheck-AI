const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const scanRoutes = require('./routes/scans');
const designRoutes = require('./routes/designs');
const creditRoutes = require('./routes/credits');
const brandKitRoutes = require('./routes/brandKits');
const notificationRoutes = require('./routes/notifications');
const templateRoutes = require('./routes/templates');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/scans', scanRoutes);
app.use('/api/designs', designRoutes);
app.use('/api/credits', creditRoutes);
app.use('/api/brand-kits', brandKitRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/templates', templateRoutes);

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);
  res.status(err.status || 500).json({ 
    error: err.message || 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running on http://0.0.0.0:${PORT}`);
  console.log('Available endpoints:');
  console.log('  GET  /api/health');
  console.log('  POST /api/auth/google');
  console.log('  POST /api/auth/verify');
  console.log('  GET  /api/users/profile');
  console.log('  PUT  /api/users/profile');
  console.log('  GET  /api/scans');
  console.log('  POST /api/scans/analyze');
  console.log('  GET  /api/designs');
  console.log('  POST /api/designs/generate');
  console.log('  GET  /api/credits/balance');
  console.log('  GET  /api/credits/packages');
  console.log('  POST /api/credits/purchase');
  console.log('  GET  /api/brand-kits');
  console.log('  POST /api/brand-kits');
  console.log('  GET  /api/notifications');
  console.log('  GET  /api/templates');
});
