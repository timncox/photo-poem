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

  // Calculate image dimensions while maintaining aspect ratio
  const maxImgWidth = 170;
  const maxImgHeight = 100; // Reduced height to leave more space for poem
  
  // Create temporary image to get dimensions
  const img = new Image();
  await new Promise((resolve) => {
    img.onload = resolve;
    img.src = imageData;
  });
  
  const imgRatio = img.width / img.height;
  let imgWidth = maxImgWidth;
  let imgHeight = imgWidth / imgRatio;
  
  if (imgHeight > maxImgHeight) {
    imgHeight = maxImgHeight;
    imgWidth = imgHeight * imgRatio;
  }

  // Center image horizontally
  const imgX = (210 - imgWidth) / 2;
  doc.addImage(
    imageData,
    'JPEG',
    imgX,
    30,
    imgWidth,
    imgHeight,
    undefined,
    'MEDIUM'
  );

  // Add poem with dynamic font sizing
  const poemY = 30 + imgHeight + 15; // Start 15mm below image
  const maxPoemHeight = 250 - poemY; // Maximum space for poem
  
  // Try different font sizes until poem fits
  let fontSize = 12;
  let poemLines;
  
  do {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', 'italic');
    poemLines = doc.splitTextToSize(poem, 170);
    
    const totalPoemHeight = poemLines.length * (fontSize * 0.3528); // Convert pt to mm
    
    if (totalPoemHeight <= maxPoemHeight || fontSize <= 8) {
      break;
    }
    
    fontSize--;
  } while (fontSize > 8);

  // Center poem horizontally
  doc.text(poemLines, 105, poemY, { align: 'center' });

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