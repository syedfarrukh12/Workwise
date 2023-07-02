import { Schema, model } from "mongoose";

const projectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Project = model("Project", projectSchema);
export default Project;
