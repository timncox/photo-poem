import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Also handle root path
router.get('*', (req, res) => {
  res.json({ 
    status: 'ok',
    message: 'Photo Poetry API Server',
    timestamp: new Date().toISOString()
  });
});

export default router;