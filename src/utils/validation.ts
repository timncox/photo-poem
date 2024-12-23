export function validateResponse(response: Response): void {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}

export function validateImageData(imageData: string): void {
  if (!imageData.startsWith('data:image/')) {
    throw new Error('Invalid image data format');
  }
}