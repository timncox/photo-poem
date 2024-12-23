import { useState, useEffect } from 'react';
import { checkServerHealth } from '../services/api/health';

export function useServerHealth() {
  const [serverReady, setServerReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkServer = async () => {
      const isHealthy = await checkServerHealth();
      setServerReady(isHealthy);
      if (!isHealthy) {
        setError('Server is not available. Please try again later.');
      }
    };
    checkServer();
  }, []);

  return { serverReady, error };
}