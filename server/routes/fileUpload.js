const express = require('express');
const multer = require('multer');
const path = require('path');
const { extractText } = require('../utils/textExtractor');
const { parseAssignments } = require('../utils/llmParser');
const Task = require('../models/task');

const router = express.Router();

// Configure Multer for File Uploads
const upload = multer({ dest: 'uploads/' });

// File Upload Route
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const filePath = path.resolve(req.file.path);

    // Step 1: Extract text from the file
    const rawText = await extractText(filePath);

    // Step 2: Send text to LLM for parsing
    const assignments = await parseAssignments(rawText);

    // Step 3: Check if assignments were found
    if (assignments.length === 0) {
      return res.status(200).json({ message: 'No assignments found in the uploaded file.' });
    }

    // Step 4: Save parsed assignments to the database
    const tasks = await Promise.all(assignments.map(async (task) => {
      const newTask = new Task(task);
      return newTask.save();
    }));

    res.status(200).json({ message: 'File parsed successfully!', tasks });
  } catch (error) {
    console.error('Error processing file upload:', error);
    res.status(500).json({ error: 'Failed to process the file. Please try again.' });
  }
});

module.exports = router;
