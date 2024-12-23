import React from 'react';
import { usePhotoAnalysis } from '../hooks/usePhotoAnalysis';
import { useServerHealth } from '../hooks/useServerHealth';
import { Camera } from './Camera';
import { PhotoDisplay } from './PhotoDisplay';
import { AnalysisDisplay } from './AnalysisResult';
import { ErrorMessage } from './ErrorMessage';
import { LoadingSpinner } from './LoadingSpinner';

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
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
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
            {loading ? <LoadingSpinner /> : result && <AnalysisDisplay result={result} />}
          </div>
        )}
      </div>
    </div>
  );
}