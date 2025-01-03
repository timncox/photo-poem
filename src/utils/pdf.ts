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

  // Calculate available space on page
  const pageWidth = 210; // A4 width in mm
  const pageMargin = 20;
  const availableWidth = pageWidth - (2 * pageMargin);
  const availableHeight = 100; // Maximum height for image section

  // Calculate scaling factor to fit image within available space
  const imgRatio = img.width / img.height;
  const pageRatio = availableWidth / availableHeight;

  let finalWidth: number;
  let finalHeight: number;

  if (imgRatio > pageRatio) {
    // Image is wider than available space ratio
    finalWidth = availableWidth;
    finalHeight = finalWidth / imgRatio;
  } else {
    // Image is taller than available space ratio
    finalHeight = availableHeight;
    finalWidth = finalHeight * imgRatio;
  }

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
    poemLines = doc.splitTextToSize(poem, availableWidth);
    
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