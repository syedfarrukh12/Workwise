import { Schema, model } from "mongoose";

const teamSchema = new Schema({
  teamName: { type: String, unique: true },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  manager: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  assignedProjects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});

const Team = model("Team", teamSchema);
export default Team;
