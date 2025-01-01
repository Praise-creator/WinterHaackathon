const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const pdfParse = require('pdf-parse');

const app = express();
const PORT = 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Multer setup for file uploads
const upload = multer({
    dest: path.join(__dirname, './uploads'), // Save uploaded files in /server/uploads
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed'));
        }
    },
});

// Endpoint for file upload
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        // Read and parse the uploaded PDF
        const filePath = path.join(__dirname, './uploads', req.file.filename);
        const dataBuffer = fs.readFileSync(filePath);
        const pdfData = await pdfParse(dataBuffer);

        // Example: Extract text and send a response
        const extractedText = pdfData.text;
        fs.unlinkSync(filePath); // Delete the file after parsing

        res.json({ message: 'File uploaded successfully', extractedText });
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

// Fallback route for handling unmatched requests (optional)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
