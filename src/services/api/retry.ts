import { API_CONSTANTS } from './constants';
import { ApiError } from '../errors';
import { sleep } from '../../utils/async';

export async function fetchWithRetry<T>(
  url: string,
  options: RequestInit,
  attempt = 1
): Promise<T> {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new ApiError(
        response.status,
        error.error || `Server error (${response.status})`
      );
    }

    return await response.json();
  } catch (error) {
    if (attempt >= API_CONSTANTS.RETRY.MAX_ATTEMPTS) throw error;
    
    await sleep(API_CONSTANTS.RETRY.DELAY * attempt);
    return fetchWithRetry<T>(url, options, attempt + 1);
  }
}