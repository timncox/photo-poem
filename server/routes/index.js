import analyzeRouter from './analyze.js';
import healthRouter from './health.js';

export function setupRoutes(app) {
  app.use('/api/analyze', analyzeRouter);
  app.use('/health', healthRouter);
  
  // 404 handler
  app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
}