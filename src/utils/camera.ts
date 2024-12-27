// Check and request camera permissions
export async function getCameraPermissions(): Promise<boolean> {
    try {
      const result = await navigator.permissions.query({ name: 'camera' as PermissionName });
      if (result.state === 'denied') {
        throw new Error('Please enable camera access in your browser settings');
      }
      return true;
    } catch (error) {
      // Fallback for browsers that don't support permission query
      return true;
    }
  }
  
  // Get media stream with proper error handling
  export async function getMediaStream(): Promise<MediaStream> {
    try {
      // Try rear camera first on mobile
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });
      return stream;
    } catch (error) {
      // If rear camera fails, try front camera
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'user',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        });
        return stream;
      } catch (secondError) {
        throw new Error('Unable to access any camera. Please check your camera permissions and try again.');
      }
    }
  }