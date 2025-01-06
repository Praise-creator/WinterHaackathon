const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  deadline: { type: Date, required: true },
  duration: { type: Number, required: true }, // Hours per week
});

module.exports = mongoose.model('Task', TaskSchema);
