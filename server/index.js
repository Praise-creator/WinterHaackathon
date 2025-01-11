const express = require('express'); 
const multer = require('multer'); 
const mongoose = require('mongoose'); 
const cors = require('cors');
const dotenv = require('dotenv'); 
const Task = require('./models/task');
const fileUploadRouter = require('./routes/fileUpload');
const { getExistingCalendarEvents, createEvent } = require('./calendar/calendar'); // Import calendar functions
const { scheduleTask } = require('./calendar/taskScheduler'); // Import scheduling functions


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
app.use('/uploads', fileUploadRouter);


// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Create a new task and schedule it
app.post('/tasks', async (req, res) => {
  try {
    const { name, startDate, endDate, duration } = req.body; // Destructure incoming data
    const task = new Task({ name, startDate, endDate, duration }); // Create a new task

    await task.save(); // Save to MongoDB

    // Schedule the task (divide into 2-hour blocks and schedule per week)
    const scheduledEvents = scheduleTask(task);

    // Fetch existing events to avoid conflicts
    const existingEvents = await getExistingCalendarEvents();

    // Logic to check for overlapping events (not implemented fully here)
    // For now, we can assume no conflict and move forward
    await createEvent(scheduledEvents);

    res.status(201).json({ message: 'Task saved and events scheduled!', task, events: scheduledEvents });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save task or schedule events.' });
  }
});
