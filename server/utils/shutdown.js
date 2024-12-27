export function handleShutdown(server) {
    const shutdown = () => {
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    };
  
    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  }