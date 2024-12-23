import { useState, useCallback } from 'react';
import { APP_CONSTANTS } from '../utils/constants';

export function useError() {
  const [error, setError] = useState<string | null>(null);

  const showError = useCallback((message: string) => {
    setError(message);
    const timer = setTimeout(() => {
      setError(null);
    }, APP_CONSTANTS.UI.ERROR_DISPLAY_DURATION);
    return () => clearTimeout(timer);
  }, []);

  return { error, showError, clearError: () => setError(null) };
}