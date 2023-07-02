import { Schema, model } from "mongoose";

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  task: {
    type: Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  }
});

export default model("Comment", commentSchema);
