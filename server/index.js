import { createApp } from './config/app.js';
import { config } from './config/environment.js';
import { SERVER_CONFIG } from './config/constants.js';

const app = createApp();

const server = app.listen(config.port, SERVER_CONFIG.DEFAULT_HOST, () => {
  console.log(`Server running on ${SERVER_CONFIG.DEFAULT_HOST}:${config.port}`);
});

// Graceful shutdown
const shutdown = () => {
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);