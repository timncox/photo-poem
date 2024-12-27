// Enhanced camera utilities with better device handling and logging
export async function getCameraPermissions(): Promise<boolean> {
  try {
    // Check if getUserMedia is available
    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error('Camera API is not supported in your browser');
    }

    const result = await navigator.permissions.query({ name: 'camera' as PermissionName });
    console.log('Camera permission status:', result.state);
    
    if (result.state === 'denied') {
      throw new Error('Camera access denied. Please enable it in your browser settings.');
    }
    return true;
  } catch (error) {
    console.log('Permission check error:', error);
    // Some browsers don't support permission query, try getUserMedia directly
    return true;
  }
}

export async function getMediaStream(preferredFacingMode: 'environment' | 'user' = 'environment'): Promise<MediaStream> {
  console.log('Requesting camera with facing mode:', preferredFacingMode);
  
  // List available devices first
  const devices = await navigator.mediaDevices.enumerateDevices();
  const videoDevices = devices.filter(device => device.kind === 'videoinput');
  console.log('Available video devices:', videoDevices);

  const constraints = {
    video: {
      facingMode: preferredFacingMode,
      width: { ideal: 1280 },
      height: { ideal: 720 }
    }
  };

  try {
    console.log('Attempting to get media stream with constraints:', constraints);
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    console.log('Stream obtained successfully');
    return stream;
  } catch (error) {
    console.error('Primary camera error:', error);
    
    // If preferred camera fails, try basic video constraints
    try {
      console.log('Attempting fallback to basic video constraints');
      const basicStream = await navigator.mediaDevices.getUserMedia({ video: true });
      return basicStream;
    } catch (finalError) {
      console.error('All camera attempts failed:', finalError);
      throw new Error('Unable to access camera. Please check your permissions and try again.');
    }
  }
}