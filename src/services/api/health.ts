import { apiRequest } from './client';
import { API_CONSTANTS } from './constants';

export async function checkServerHealth(): Promise<boolean> {
  try {
    await apiRequest(API_CONSTANTS.ENDPOINTS.HEALTH);
    return true;
  } catch {
    return false;
  }
}