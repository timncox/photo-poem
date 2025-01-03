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

  // A4 dimensions in mm
  const pageWidth = 210;
  const pageMargin = 20;

  // The maximum width and height in which we want to fit the image
  const maxWidth = pageWidth - 2 * pageMargin; // e.g., 170 mm
  const maxHeight = 120; // e.g., 120 mm

  // Calculate aspect ratio based on intrinsic pixel dimensions
  const aspectRatio = img.width / img.height;

  // Start with fitting to maxWidth
  let finalWidth = maxWidth;
  let finalHeight = finalWidth / aspectRatio;

  // If that height is still too large, constrain by maxHeight
  if (finalHeight > maxHeight) {
    finalHeight = maxHeight;
    finalWidth = finalHeight * aspectRatio;
  }

  // Center the image horizontally on the page
  const imgX = (pageWidth - finalWidth) / 2;
  const imgY = 30; // some top margin

  // Add image
  doc.addImage(
    imageData,
    'JPEG',
    imgX,
    imgY,
    finalWidth,
    finalHeight,
    undefined,
    'MEDIUM'
  );

  // Add poem with dynamic font sizing
  const poemY = imgY + finalHeight + 15;
  const maxPoemHeight = 250 - poemY;
  
  let fontSize = 12;
  let poemLines;
  
  do {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', 'normal');
    poemLines = doc.splitTextToSize(poem, maxWidth);
    
    // Approx. line height in mm = fontSize * 0.3528
    const totalPoemHeight = poemLines.length * (fontSize * 0.3528);
    
    // If the poem fits OR if we’ve hit our minimum font size, stop shrinking
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
