import React from 'react';
import { Loader } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8 text-gray-800 dark:text-gray-200">
      <Loader className="animate-spin" size={24} />
      <span className="ml-2">Analyzing photo and generating poetry...</span>
    </div>
  );
}