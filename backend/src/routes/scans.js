const express = require('express');
const router = express.Router();

const scans = [
  {
    id: '388',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCk4gFPdLi7Fcc03ZFQ9d8yYzErFQ2J7OZQ6n_rCN-MUJuYHas_4qDSQelA3n5Grlq1tRjB1AGru-Hjb9kJvw9sfpMDmlRBru9E5AzhbMXE8goJ_7QtVwkPNmVmyHgjwpN3cPsj3IIeLnaKhMGoEB8Hzvfky1zGX4Uu90KHt1QeGlRSqEnogM3r-9KRsp86tTBlrkT7JxheQ6R29i3Ivs781L_3u1-PpleSp2TLqYD08sZFFmueeGNSKUotWR34IlLOxzwoasTFfCE',
    result: 'fake',
    confidence: 23,
    createdAt: '2025-12-15T10:30:00Z',
    metadata: { type: 'product', category: 'electronics' }
  },
  {
    id: '166',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEf7FRTa4h4RnB-_a37vFMJ4-lEF31Blev8zubXBXxsDXWrMswNFVPosLU2bh9bBdSiyn-ZmMop1TGgOGHaC3ROJnl3uUMnpCE66Ra8HYBvc8BhMYsJmjbelvTyGd8dHzZd6IRZ_2TTMJ-aq1veNXTMzuFDKAZU6sqOey81dCtjT9T3x0XJqFH37Fomuq9W5oZhwNcQJTjySycCA3RP_olkvlwa8_Gol0SYC6QujHYp-VO8H7CLPTeNnSM0TeRZ22HbaQNE4XVwYE',
    result: 'authentic',
    confidence: 94,
    createdAt: '2025-12-15T09:15:00Z',
    metadata: { type: 'document', category: 'certificate' }
  }
];

router.get('/', (req, res) => {
  res.json(scans);
});

router.get('/:id', (req, res) => {
  const scan = scans.find(s => s.id === req.params.id);
  if (!scan) {
    return res.status(404).json({ error: 'Scan not found' });
  }
  res.json(scan);
});

router.post('/analyze', async (req, res) => {
  const newScan = {
    id: Date.now().toString(),
    imageUrl: req.body.imageUrl || '',
    result: Math.random() > 0.5 ? 'authentic' : 'fake',
    confidence: Math.floor(Math.random() * 40) + 60,
    createdAt: new Date().toISOString(),
    metadata: { type: 'product' }
  };
  scans.unshift(newScan);
  res.json(newScan);
});

module.exports = router;
