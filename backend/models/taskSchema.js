import { Schema, model } from "mongoose";

const taskSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ["hold", "new", "inDevelopment", "readyForDevelopment", "readyForTesting", "inQATesting", "finalReview", "completed"],
    default: "new",
  },
  priority: { 
    type: String,
    enum: ["high", "medium", "low", "critical"],
    default: "low",
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: "true",
  },
  dueDate: {
    type: Date,
  },
  assignee: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  visible: {
    type: Boolean,
    default: true,
  }
});

export default model("Task", taskSchema);
