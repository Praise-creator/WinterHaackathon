const fs = require('fs');
const pdfParse = require('pdf-parse');

// Extract text from PDFs
const extractTextFromPDF = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    return pdfData.text;
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw error;
  }
};

// Main Function: Extract text from PDF
const extractText = async (filePath) => {
  
    return extractTextFromPDF(filePath);

  // Add image handling later if needed
  //throw new Error('Unsupported file format');
};

module.exports = { extractText };
