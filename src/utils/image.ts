// Image processing utilities
export function validateImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Invalid file type. Please upload an image.'));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

export function processImageData(imageData: string): string {
  return imageData.startsWith('data:image/') 
    ? imageData 
    : `data:image/jpeg;base64,${imageData}`;
}