import React from 'react';
import { Download } from 'lucide-react';
import { createPhotoPoetryPdf } from '../utils/pdf';

interface ExportButtonProps {
  imageData: string;
  poem: string;
  className?: string;
}

export function ExportButton({ imageData, poem, className = '' }: ExportButtonProps) {
  const handleExport = async () => {
    try {
      const pdfBlob = await createPhotoPoetryPdf(imageData, poem);
      const url = URL.createObjectURL(pdfBlob);
      
      // Create temporary link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = `photo-poetry-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('Failed to export PDF. Please try again.');
    }
  };

  return (
    <button
      onClick={handleExport}
      className={`flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors ${className}`}
    >
      <Download size={20} />
      Export PDF
    </button>
  );
}