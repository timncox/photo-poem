import express from 'express';
import { setupMiddleware } from '../middleware/index.js';
import { setupRoutes } from '../routes/index.js';
import { errorHandler } from '../middleware/errorHandler.js';

export function createApp() {
  const app = express();
  
  // Ensure middleware is set up before routes
  setupMiddleware(app);
  setupRoutes(app);
  
  // Error handler must be last
  app.use(errorHandler);
  
  return app;
}