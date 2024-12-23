import { createApp } from './config/app.js';
import { config } from './config/environment.js';

const app = createApp();

const server = app.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}`);
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