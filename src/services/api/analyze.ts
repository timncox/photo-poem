import { apiRequest } from './client';
import { API_CONFIG } from './config';
import type { AnalysisResult } from './types';

export async function analyzePhoto(photoData: string): Promise<AnalysisResult> {
  return apiRequest<AnalysisResult>(API_CONFIG.endpoints.analyze, {
    method: 'POST',
    body: JSON.stringify({ image: photoData })
  });
}