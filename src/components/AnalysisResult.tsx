import React from 'react';
import type { AnalysisResult } from '../services/api/types';
import { ExportButton } from './ExportButton';

interface AnalysisResultProps {
  result: AnalysisResult;
  photoUrl: string;
}

export function AnalysisDisplay({ result, photoUrl }: AnalysisResultProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
      <div>
        <h2 className="text-lg font-semibold mb-2">Vision Analysis</h2>
        <p className="text-gray-600">{result.description}</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Generated Poem</h2>
        <pre className="whitespace-pre-wrap font-serif text-gray-800">
          {result.poem}
        </pre>
      </div>
      <ExportButton 
        imageData={photoUrl}
        poem={result.poem}
        className="mt-4"
      />
    </div>
  );
}