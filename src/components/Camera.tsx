import React from 'react';
import { FileUpload } from './FileUpload';

interface CameraProps {
  onPhotoCapture: (photo: string) => void;
}

export function Camera({ onPhotoCapture }: CameraProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <FileUpload 
        onFileSelect={onPhotoCapture}
        onError={(error) => alert(error)}
      />
    </div>
  );
}