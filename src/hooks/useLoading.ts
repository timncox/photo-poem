import { useState, useCallback } from 'react';
import { APP_CONSTANTS } from '../utils/constants';

export function useLoading() {
  const [loading, setLoading] = useState(false);
  const [loadingTimer, setLoadingTimer] = useState<number | null>(null);

  const startLoading = useCallback(() => {
    const timer = window.setTimeout(() => {
      setLoading(true);
    }, APP_CONSTANTS.UI.LOADING_DELAY);
    setLoadingTimer(timer);
  }, []);

  const stopLoading = useCallback(() => {
    if (loadingTimer) {
      clearTimeout(loadingTimer);
      setLoadingTimer(null);
    }
    setLoading(false);
  }, [loadingTimer]);

  return { loading, startLoading, stopLoading };
}