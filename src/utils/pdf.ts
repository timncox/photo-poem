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

  // Load image and get dimensions
  const img = new Image();
  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
    img.src = imageData;
  });

  // Calculate dimensions for A4 page in mm (210 x 297)
  const pageWidth = 210;
  const pageMargin = 20;
  const maxWidth = pageWidth - (2 * pageMargin); // 170mm
  const maxHeight = 120; // Maximum height allowed for image

  // Convert image dimensions from pixels to mm (assuming 72 DPI)
  const pxToMm = 25.4 / 72; // 1 inch = 25.4mm, 72px = 1 inch
  const imgWidthMm = img.width * pxToMm;
  const imgHeightMm = img.height * pxToMm;

  // Calculate scaling ratio while preserving aspect ratio
  const widthRatio = maxWidth / imgWidthMm;
  const heightRatio = maxHeight / imgHeightMm;
  const scale = Math.min(widthRatio, heightRatio);

  // Final dimensions in mm
  const finalWidth = imgWidthMm * scale;
  const finalHeight = imgHeightMm * scale;

  // Center image horizontally
  const imgX = (pageWidth - finalWidth) / 2;

  // Add image
  doc.addImage(
    imageData,
    'JPEG',
    imgX,
    30, // Fixed Y position
    finalWidth,
    finalHeight,
    undefined,
    'MEDIUM'
  );

  // Add poem with dynamic font sizing
  const poemY = 30 + finalHeight + 15;
  const maxPoemHeight = 250 - poemY;
  
  let fontSize = 12;
  let poemLines;
  
  do {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', 'normal');
    poemLines = doc.splitTextToSize(poem, maxWidth);
    
    const totalPoemHeight = poemLines.length * (fontSize * 0.3528);
    
    if (totalPoemHeight <= maxPoemHeight || fontSize <= 8) {
      break;
    }
    
    fontSize--;
  } while (fontSize > 8);

  // Left align poem with margin
  doc.text(poemLines, pageMargin, poemY);

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