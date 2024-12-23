import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { validateImage } from '../utils/image';

interface FileUploadProps {
  onFileSelect: (photoData: string) => void;
  onError: (error: string) => void;
}

export function FileUpload({ onFileSelect, onError }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const imageData = await validateImage(file);
      onFileSelect(imageData);
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Failed to process image');
    }
  };

  return (
    <div className="mt-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="w-full bg-gray-100 text-gray-700 p-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
      >
        <Upload size={24} />
        Upload Photo
      </button>
    </div>
  );
}