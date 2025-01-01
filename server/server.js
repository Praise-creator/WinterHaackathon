const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware for serving static files
app.use(express.static(path.join(__dirname, '../')));
app.use(express.json());

// Configure multer for file uploads
const upload = multer({
    dest: 'uploads/',
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed.'));
        }
    }
});

// Endpoint to handle file uploads
app.post('/upload', upload.single('document'), async (req, res) => {
    try {
        const filePath = req.file.path;

        // Read the uploaded PDF file
        const fileBuffer = fs.readFileSync(filePath);

        // Extract text from the PDF
        const data = await pdfParse(fileBuffer);

        // Parse the extracted text
        const parsedInfo = parseDocument(data.text);

        // Delete the uploaded file after parsing
        fs.unlinkSync(filePath);

        res.status(200).json({
            message: 'File uploaded and parsed successfully.',
            data: parsedInfo,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error processing the file.' });
    }
});

// Function to parse the document text
function parseDocument(text) {
    const assignments = [];
    const assignmentRegex = /\b(assignment|homework|task)\b/i;
    const dateRegex = /\b(?:\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\b \d{1,2},? \d{4})\b/i;

    const lines = text.split('\n');

    lines.forEach((line) => {
        if (assignmentRegex.test(line)) {
            const dueDate = line.match(dateRegex)?.[0];
            assignments.push({ task: line, dueDate: dueDate || 'Unknown' });
        }
    });

    return { assignments };
}

// Endpoint to calculate study plan
app.post('/schedule', (req, res) => {
    const { assignments, hoursPerAssignment } = req.body;

    const studyPlan = assignments.map((assignment, index) => {
        const totalHours = hoursPerAssignment[index];
        const daysUntilDue = Math.max(
            Math.ceil((new Date(assignment.dueDate) - new Date()) / (1000 * 60 * 60 * 24)),
            1
        );

        const hoursPerDay = Math.ceil(totalHours / daysUntilDue);
        const schedule = [];

        for (let i = 0; i < daysUntilDue; i++) {
            schedule.push(`Day ${i + 1}: Work on "${assignment.task}" for ${hoursPerDay} hours`);
        }

        return { task: assignment.task, dueDate: assignment.dueDate, schedule };
    });

    res.status(200).json({ studyPlan });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
