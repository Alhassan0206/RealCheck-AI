const express = require('express');
const router = express.Router();

const designs = [
  {
    id: '1',
    title: 'Summer Sale Flyer',
    type: 'flyer',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALSEzUF4lRzsTTsoN_p5PMeYJ5xXQqCLsGe7mAIkFhaKyWuxzyTtuRdfY_d7oC1eb_1m6EzVsk54LpRpIVlAlmECqDqUsZEV81j9RXNc1-EBVDpGfG9G3wEFBbVylHSdU1-kvIiHIdtlimUa7AwY-H3_12c5JLV633_lRqKMNdAEL_KRHIl6O5L1P8Sk77A82m7NiZvZO74dOsU6QGfolJa1TVuWqcBElLEAnagv3TcFxHmkg6__0cskOTbr7OAa6FVJfPf4urFF8',
    status: 'draft',
    createdAt: '2025-12-14T14:20:00Z'
  }
];

router.get('/', (req, res) => {
  res.json(designs);
});

router.get('/:id', (req, res) => {
  const design = designs.find(d => d.id === req.params.id);
  if (!design) {
    return res.status(404).json({ error: 'Design not found' });
  }
  res.json(design);
});

router.post('/generate', async (req, res) => {
  const { prompt, templateId, brandKitId } = req.body;
  
  setTimeout(() => {
    const newDesign = {
      id: Date.now().toString(),
      title: prompt || 'New Design',
      type: 'poster',
      imageUrl: 'https://via.placeholder.com/400x600',
      status: 'completed',
      createdAt: new Date().toISOString()
    };
    designs.unshift(newDesign);
    res.json(newDesign);
  }, 2000);
});

module.exports = router;
