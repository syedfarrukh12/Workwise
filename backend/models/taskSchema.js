const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['new', 'in progress', 'completed'], default: 'new' },
    priority: { type: Number, default: 1 },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
});
  
module.exports = mongoose.model("Task", taskSchema);