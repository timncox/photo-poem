import React, { useRef, useState } from 'react';
import { Camera as CameraIcon } from 'lucide-react';
import { FileUpload } from './FileUpload';

interface CameraProps {
  onPhotoCapture: (photo: string) => void;
}

export function Camera({ onPhotoCapture }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setError('');
    } catch (err) {
      setError('Unable to access camera. Please ensure you have granted camera permissions.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.drawImage(videoRef.current, 0, 0);
    const photoData = canvas.toDataURL('image/jpeg');
    onPhotoCapture(photoData);
    stopCamera();
  };

  return (
    <div className="relative w-full max-w-md mx-auto space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {!stream ? (
        <>
          <button
            onClick={startCamera}
            className="w-full bg-blue-500 text-white p-4 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
          >
            <CameraIcon size={24} />
            Take Photo
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
        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full rounded-lg"
          />
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
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