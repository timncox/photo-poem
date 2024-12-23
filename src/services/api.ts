const API_URL = `http://localhost:3000/api`;

export class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function analyzePhoto(photoData: string): Promise<{ description: string; poem: string }> {
  try {
    const response = await fetch(`${API_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: photoData }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new ApiError(response.status, error.message || 'Failed to analyze photo');
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    console.error('API Error:', error);
    throw new ApiError(500, 'Failed to connect to server');
  }
}