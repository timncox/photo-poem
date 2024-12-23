import React from 'react';
import { ImageIcon } from 'lucide-react';

interface PhotoDisplayProps {
  photoUrl: string;
  onReset: () => void;
}

export function PhotoDisplay({ photoUrl, onReset }: PhotoDisplayProps) {
  return (
    <div className="relative">
      <img 
        src={photoUrl} 
        alt="Captured" 
        className="w-full rounded-lg shadow-lg"
      />
      <button
        onClick={onReset}
        className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
      >
        <ImageIcon size={20} />
      </button>
    </div>
  );
}