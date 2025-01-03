import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Camera as CameraIcon, RefreshCw } from 'lucide-react';
import { FileUpload } from './FileUpload';
import { getCameraPermissions, getMediaStream } from '../utils/camera';

interface CameraProps {
  onPhotoCapture: (photo: string) => void;
}

export function Camera({ onPhotoCapture }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');

  const startCamera = useCallback(async () => {
    if (isLoading || !videoRef.current) return;
    
    try {
      setIsLoading(true);
      setError('');
      
      const hasPermission = await getCameraPermissions();
      if (!hasPermission) {
        throw new Error('Camera permission denied');
      }

      const mediaStream = await getMediaStream(facingMode);
      videoRef.current.srcObject = mediaStream;
      setStream(mediaStream);

      // Wait for video metadata to load to get correct dimensions
      await new Promise<void>((resolve) => {
        if (!videoRef.current) return;
        videoRef.current.onloadedmetadata = () => resolve();
      });

      await videoRef.current.play();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to start camera';
      console.error('Camera initialization error:', err);
      setError(message);
      stopCamera();
    } finally {
      setIsLoading(false);
    }
  }, [facingMode, isLoading]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, [stream]);

  const switchCamera = () => {
    stopCamera();
    setFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
  };

  const retryCamera = async () => {
    stopCamera();
    await startCamera();
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    
    // Use actual video dimensions
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Flip horizontally if using front camera
    if (facingMode === 'user') {
      ctx.scale(-1, 1);
      ctx.translate(-canvas.width, 0);
    }
    
    ctx.drawImage(video, 0, 0);
    const photoData = canvas.toDataURL('image/jpeg', 0.8);
    onPhotoCapture(photoData);
    stopCamera();
  };

  useEffect(() => {
    if (!stream) {
      startCamera();
    }
    return () => {
      stopCamera();
    };
  }, [facingMode, startCamera, stopCamera, stream]);

  return (
    <div className="relative w-full max-w-md mx-auto space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <p className="block mb-2">{error}</p>
          <button
            onClick={retryCamera}
            className="flex items-center text-sm font-medium text-red-700 hover:text-red-900"
          >
            <RefreshCw size={16} className="mr-1" />
            Try again
          </button>
        </div>
      )}
      
      {!stream ? (
        <>
          <button
            onClick={startCamera}
            disabled={isLoading}
            className="w-full bg-blue-500 text-white p-4 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors disabled:bg-blue-300"
          >
            <CameraIcon size={24} />
            {isLoading ? 'Starting Camera...' : 'Take Photo'}
          </button>
          <div className="relative text-center">
            <hr className="my-4 border-gray-300" />
            <span className="bg-gray-100 px-4 text-sm text-gray-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              or
            </span>
          </div>
          <FileUpload 
            onFileSelect={onPhotoCapture} 
            onError={setError}
          />
        </>
      ) : (
        <div className="relative w-full">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full object-contain rounded-lg"
            style={{ 
              transform: facingMode === 'user' ? 'scaleX(-1)' : 'none',
              aspectRatio: '16/9'
            }}
          />
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
            <button
              onClick={switchCamera}
              className="bg-white text-blue-500 p-3 rounded-full shadow-lg hover:bg-blue-50 transition-colors"
            >
              <RefreshCw size={20} />
            </button>
            <button
              onClick={capturePhoto}
              className="bg-white text-blue-500 p-4 rounded-full shadow-lg hover:bg-blue-50 transition-colors"
            >
              <CameraIcon size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}