import express from 'express';
import { synthesizeSpeech } from '../services/tts/synthesize.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const audioBuffer = await synthesizeSpeech(text);
    
    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Disposition': 'attachment; filename="poem.mp3"'
    });
    
    res.send(Buffer.from(audioBuffer));
  } catch (error) {
    next(error);
  }
});

export default router;