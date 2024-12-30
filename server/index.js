const express = require('express'); // Import Express
const multer = require('multer'); // For file uploads
const mongoose = require('mongoose'); // For database
const cors = require('cors'); // To allow frontend-backend communication
const dotenv = require('dotenv'); // To manage environment variables

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