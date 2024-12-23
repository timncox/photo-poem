import express from 'express';
import { setupMiddleware } from '../middleware/index.js';
import { setupRoutes } from '../routes/index.js';
import { errorHandler } from '../middleware/errorHandler.js';
import { requestLogger } from '../middleware/logging.js';

export function createApp() {
  const app = express();
  
  // Add request logging first
  app.use(requestLogger);
  
  // Setup other middleware and routes
  setupMiddleware(app);
  setupRoutes(app);
  
  // Error handler must be last
  app.use(errorHandler);
  
  return app;
}