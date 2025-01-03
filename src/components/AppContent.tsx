import React from 'react';
import { usePhotoAnalysis } from '../hooks/usePhotoAnalysis';
import { useServerHealth } from '../hooks/useServerHealth';
import { Camera } from './Camera';
import { PhotoDisplay } from './PhotoDisplay';
import { AnalysisDisplay } from './AnalysisResult';
import { ErrorMessage } from './ErrorMessage';
import { LoadingSpinner } from './LoadingSpinner';
import { ThemeToggle } from './ThemeToggle';

export function AppContent() {
  const { serverReady, error: serverError } = useServerHealth();
  const { 
    photo, 
    loading, 
    result, 
    error,
    handlePhotoCapture, 
    resetPhoto 
  } = usePhotoAnalysis(serverReady);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 transition-colors">
      <ThemeToggle />
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">
          Photo Poetry
        </h1>

        {!serverReady && (
          <ErrorMessage message={serverError || "Connecting to server..."} />
        )}

        {!photo ? (
          <Camera onPhotoCapture={handlePhotoCapture} />
        ) : (
          <div className="space-y-4">
            <PhotoDisplay photoUrl={photo} onReset={resetPhoto} />
            {error && <ErrorMessage message={error} />}
            {loading ? (
              <LoadingSpinner />
            ) : (
              result && <AnalysisDisplay result={result} photoUrl={photo} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}