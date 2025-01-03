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
  const maxImgHeight = 100;
  
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
  const poemY = 30 + imgHeight + 15;
  const maxPoemHeight = 250 - poemY;
  
  let fontSize = 12;
  let poemLines;
  
  do {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', 'normal'); // Changed from 'italic' to 'normal'
    poemLines = doc.splitTextToSize(poem, 170);
    
    const totalPoemHeight = poemLines.length * (fontSize * 0.3528);
    
    if (totalPoemHeight <= maxPoemHeight || fontSize <= 8) {
      break;
    }
    
    fontSize--;
  } while (fontSize > 8);

  // Left align poem with margin
  doc.text(poemLines, 20, poemY); // Changed from centered (105) to left margin (20)

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