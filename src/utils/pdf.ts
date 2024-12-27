import { jsPDF } from 'jspdf';

interface PdfExportOptions {
  title?: string;
  author?: string;
  imageQuality?: number;
}

export async function createPhotoPoetryPdf(
  imageData: string,
  poem: string,
  options: PdfExportOptions = {}
): Promise<Blob> {
  const {
    title = 'Photo Poetry',
    author = 'Photo Poetry App',
    imageQuality = 0.8
  } = options;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Set metadata
  doc.setProperties({
    title,
    author,
    creator: author,
    subject: 'Photo and Generated Poem'
  });

  // Add title
  doc.setFontSize(24);
  doc.text(title, 105, 20, { align: 'center' });

  // Add image
  const imgWidth = 170;
  const imgHeight = 120;
  doc.addImage(
    imageData,
    'JPEG',
    20,
    30,
    imgWidth,
    imgHeight,
    undefined,
    'MEDIUM'
  );

  // Add poem
  doc.setFontSize(12);
  doc.setFont('helvetica', 'italic');
  
  const poemLines = doc.splitTextToSize(poem, 170);
  doc.text(poemLines, 20, 165);

  // Add footer
  doc.setFontSize(10);
  doc.setTextColor(128);
  doc.text(
    'Created with Photo Poetry App',
    105,
    285,
    { align: 'center' }
  );

  return doc.output('blob');
}