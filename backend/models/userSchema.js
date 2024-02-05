import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "manager", "qa", "developer"],
    default: "qa",
  },
  about: {
    type: String,
  }
});

const User = model("User", userSchema);
export default User;
