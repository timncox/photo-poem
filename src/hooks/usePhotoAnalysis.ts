import { useState, useCallback } from 'react';
import { analyzePhoto } from '../services/api/analyze';
import { useError } from './useError';
import { useLoading } from './useLoading';
import type { AnalysisResult } from '../services/api/types';
import { ApiError } from '../services/errors';
import { validateImageData } from '../utils/validation';

export function usePhotoAnalysis(serverReady: boolean) {
  const [photo, setPhoto] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const { error, showError, clearError } = useError();
  const { loading, startLoading, stopLoading } = useLoading();

  const handlePhotoCapture = useCallback(async (photoData: string) => {
    if (!serverReady) {
      showError('Server is not available. Please try again later.');
      return;
    }

    try {
      validateImageData(photoData);
      setPhoto(photoData);
      clearError();
      startLoading();

      const analysis = await analyzePhoto(photoData);
      setResult(analysis);
    } catch (err) {
      const message = err instanceof ApiError 
        ? err.message 
        : 'Failed to analyze photo. Please try again.';
      showError(message);
      console.error('Photo analysis failed:', err);
    } finally {
      stopLoading();
    }
  }, [serverReady, showError, clearError, startLoading, stopLoading]);

  const resetPhoto = useCallback(() => {
    setPhoto(null);
    setResult(null);
    clearError();
  }, [clearError]);

  return {
    photo,
    loading,
    result,
    error,
    handlePhotoCapture,
    resetPhoto
  };
}