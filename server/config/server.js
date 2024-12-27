import { createServer } from './createServer.js';
import { handleShutdown } from '../utils/shutdown.js';

export function startServer(port, host) {
  const server = createServer();
  
  const instance = server.listen(port, host, () => {
    console.log(`Server running on ${host}:${port}`);
  });

  handleShutdown(instance);
  
  return instance;
}