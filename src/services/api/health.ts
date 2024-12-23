import { apiRequest } from './client';
import { API_CONFIG } from './config';

export async function checkServerHealth(): Promise<boolean> {
  try {
    await apiRequest(API_CONFIG.endpoints.health, { method: 'GET' });
    return true;
  } catch {
    return false;
  }
}