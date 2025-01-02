const express = require('express'); 
const multer = require('multer'); 
const mongoose = require('mongoose'); 
const cors = require('cors');
const dotenv = require('dotenv'); 
const Task = require('./models/task');


dotenv.config(); // Load environment variables from .env file

const app = express(); // Initialize the app
const PORT = process.env.PORT || 5000; // Use PORT from .env or default to 5000

// Middleware
app.use(cors()); // Allow requests from other origins
app.use(express.json()); // Parse incoming JSON data

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// File upload route
const upload = multer({ dest: 'uploads/' }); // Save files to the 'uploads' folder

app.post('/upload', upload.single('file'), (req, res) => {
  try {
    const file = req.file; // Access uploaded file
    console.log(file); // Log file details
    res.status(200).json({ message: 'File uploaded successfully!', file });
  } catch (error) {
    res.status(500).json({ error: 'File upload failed.' });
  }
});


// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

//  Create a new task
app.post('/tasks', async (req, res) => {
  try {
    const { name, deadline, duration } = req.body; // Destructure incoming data
    const task = new Task({ name, deadline, duration }); // Create a new task
    await task.save(); // Save to MongoDB
    res.status(201).json({ message: 'Task saved!', task });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save task.' });
}
  });