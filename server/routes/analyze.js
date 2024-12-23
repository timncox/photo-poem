import express from 'express';
import { analyzeImage } from '../services/vision/analyze.js';
import { generatePoem } from '../services/openai.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { image } = req.body;
    
    if (!image) {
      return res.status(400).json({ error: 'Image data is required' });
    }

    const analysis = await analyzeImage(image);
    
    // Check safe search before proceeding
    const safeSearch = analysis.safeSearch;
    if (safeSearch?.adult === 'LIKELY' || safeSearch?.violence === 'LIKELY') {
      return res.status(400).json({ 
        error: 'Image content not appropriate' 
      });
    }

    const poem = await generatePoem(analysis.description);
    
    res.json({ 
      description: analysis.description,
      colors: analysis.colors,
      poem 
    });
  } catch (error) {
    next(error);
  }
});

export default router;