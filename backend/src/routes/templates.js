const express = require('express');
const { db } = require('../db');
const { templates } = require('../schema');
const { eq, desc } = require('drizzle-orm');

const router = express.Router();

const DEFAULT_TEMPLATES = [
  { id: 1, name: 'Modern Poster', category: 'poster', previewUrl: 'https://via.placeholder.com/300x400?text=Modern+Poster' },
  { id: 2, name: 'Minimalist Flyer', category: 'flyer', previewUrl: 'https://via.placeholder.com/300x400?text=Minimalist+Flyer' },
  { id: 3, name: 'Bold Event', category: 'event', previewUrl: 'https://via.placeholder.com/300x400?text=Bold+Event' },
  { id: 4, name: 'Product Showcase', category: 'product', previewUrl: 'https://via.placeholder.com/300x400?text=Product+Showcase' },
  { id: 5, name: 'Social Media', category: 'social', previewUrl: 'https://via.placeholder.com/300x400?text=Social+Media' },
  { id: 6, name: 'Sale Announcement', category: 'sale', previewUrl: 'https://via.placeholder.com/300x400?text=Sale+Announcement' },
  { id: 7, name: 'Restaurant Menu', category: 'menu', previewUrl: 'https://via.placeholder.com/300x400?text=Restaurant+Menu' },
  { id: 8, name: 'Business Card', category: 'business', previewUrl: 'https://via.placeholder.com/300x400?text=Business+Card' }
];

router.get('/', async (req, res) => {
  try {
    const dbTemplates = await db.select()
      .from(templates)
      .where(eq(templates.isActive, true))
      .orderBy(desc(templates.createdAt));

    if (dbTemplates.length === 0) {
      return res.json(DEFAULT_TEMPLATES);
    }

    res.json(dbTemplates);
  } catch (error) {
    console.error('Get templates error:', error);
    res.json(DEFAULT_TEMPLATES);
  }
});

router.get('/categories', (req, res) => {
  const categories = [
    { id: 'poster', name: 'Posters', icon: '🎨' },
    { id: 'flyer', name: 'Flyers', icon: '📄' },
    { id: 'event', name: 'Events', icon: '🎉' },
    { id: 'product', name: 'Products', icon: '📦' },
    { id: 'social', name: 'Social Media', icon: '📱' },
    { id: 'sale', name: 'Sales', icon: '🏷️' },
    { id: 'menu', name: 'Menus', icon: '🍽️' },
    { id: 'business', name: 'Business', icon: '💼' }
  ];
  res.json(categories);
});

router.get('/:id', async (req, res) => {
  try {
    const template = DEFAULT_TEMPLATES.find(t => t.id === parseInt(req.params.id));
    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }
    res.json(template);
  } catch (error) {
    console.error('Get template error:', error);
    res.status(500).json({ error: 'Failed to get template' });
  }
});

module.exports = router;
