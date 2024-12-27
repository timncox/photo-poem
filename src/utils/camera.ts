// Enhanced camera utilities with better device handling
export async function getCameraPermissions(): Promise<boolean> {
  try {
    const result = await navigator.permissions.query({ name: 'camera' as PermissionName });
    if (result.state === 'denied') {
      throw new Error('Camera access denied. Please enable it in your browser settings.');
    }
    return true;
  } catch (error) {
    // Some browsers don't support permission query
    return true;
  }
}

export async function getMediaStream(preferredFacingMode: 'environment' | 'user' = 'environment'): Promise<MediaStream> {
  const constraints = {
    video: {
      facingMode: preferredFacingMode,
      width: { ideal: 1920 },
      height: { ideal: 1080 }
    }
  };

  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    return stream;
  } catch (error) {
    // If preferred camera fails, try the other one
    const fallbackMode = preferredFacingMode === 'environment' ? 'user' : 'environment';
    try {
      const fallbackStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: fallbackMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      return fallbackStream;
    } catch (secondError) {
      // If both fail, try basic video constraints
      try {
        const basicStream = await navigator.mediaDevices.getUserMedia({ video: true });
        return basicStream;
      } catch (finalError) {
        throw new Error('Unable to access camera. Please check your permissions and try again.');
      }
    }
  }
}