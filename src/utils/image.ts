import { APP_CONSTANTS } from './constants';

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

export function fixImageOrientation(imageData: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      // Create a temporary image to read EXIF data
      const tempImage = new Image();
      tempImage.onload = () => {
        // Get orientation from EXIF
        const orientation = getImageOrientation(tempImage);
        
        // Set proper canvas dimensions before transform
        if (orientation > 4) {
          canvas.width = img.height;
          canvas.height = img.width;
        } else {
          canvas.width = img.width;
          canvas.height = img.height;
        }

        // Transform context based on EXIF orientation
        switch (orientation) {
          case 2: // horizontal flip
            ctx.transform(-1, 0, 0, 1, canvas.width, 0);
            break;
          case 3: // 180° rotate left
            ctx.transform(-1, 0, 0, -1, canvas.width, canvas.height);
            break;
          case 4: // vertical flip
            ctx.transform(1, 0, 0, -1, 0, canvas.height);
            break;
          case 5: // vertical flip + 90° rotate right
            ctx.transform(0, 1, 1, 0, 0, 0);
            break;
          case 6: // 90° rotate right
            ctx.transform(0, 1, -1, 0, canvas.width, 0);
            break;
          case 7: // horizontal flip + 90° rotate right
            ctx.transform(0, -1, -1, 0, canvas.width, canvas.height);
            break;
          case 8: // 90° rotate left
            ctx.transform(0, -1, 1, 0, 0, canvas.height);
            break;
          default: // default orientation
            break;
        }

        // Draw the image with the correct orientation
        ctx.drawImage(img, 0, 0);
        
        // Convert to base64 with high quality
        resolve(canvas.toDataURL('image/jpeg', APP_CONSTANTS.IMAGE.QUALITY));
      };
      tempImage.src = imageData;
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = imageData;
  });
}

function getImageOrientation(img: HTMLImageElement): number {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return 1;

  // Draw image to canvas to read pixel data
  canvas.width = 1;
  canvas.height = 1;
  ctx.drawImage(img, 0, 0);
  
  try {
    // Try to read EXIF data from pixel data
    const uInt8Array = new Uint8Array(ctx.getImageData(0, 0, 1, 1).data.buffer);
    let dataView = new DataView(uInt8Array.buffer);
    
    if (dataView.getUint16(0, false) !== 0xFFD8) return 1;
    
    const length = uInt8Array.length;
    let offset = 2;
    
    while (offset < length) {
      const marker = dataView.getUint16(offset, false);
      offset += 2;
      
      if (marker === 0xFFE1) {
        if (dataView.getUint32(offset += 2, false) !== 0x45786966) return 1;
        
        const little = dataView.getUint16(offset += 6, false) === 0x4949;
        offset += dataView.getUint32(offset + 4, little);
        
        const tags = dataView.getUint16(offset, little);
        offset += 2;
        
        for (let i = 0; i < tags; i++) {
          if (dataView.getUint16(offset + (i * 12), little) === 0x0112) {
            return dataView.getUint16(offset + (i * 12) + 8, little);
          }
        }
      } else if ((marker & 0xFF00) !== 0xFF00) break;
      else offset += dataView.getUint16(offset, false);
    }
  } catch (error) {
    console.warn('Failed to read EXIF orientation:', error);
  }
  
  return 1; // Default orientation if no EXIF data found
}