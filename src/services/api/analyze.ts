import { apiRequest } from './client';
import { API_CONSTANTS } from './constants';
import type { AnalysisResult } from './types';

export async function analyzePhoto(photoData: string): Promise<AnalysisResult> {
  return apiRequest<AnalysisResult>(API_CONSTANTS.ENDPOINTS.ANALYZE, {
    method: 'POST',
    body: JSON.stringify({ image: photoData })
  });
}