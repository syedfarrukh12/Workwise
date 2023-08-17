import express from "express";
const app = express();
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import "./DB/connection.js";
import dashboardRoute from "./routes/dashboard/dashboard.js";
import notificationRoute from "./routes/notifications/notification.js";
import userRoute from "./routes/users/users.js";
import projectRoute from "./routes/projects/projects.js";
import taskRoute from "./routes/tasks/tasks.js";
import commentRoute from "./routes/comments/comments.js";
import teamRoute from "./routes/teams/teams.js";


const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("<code>Welcome to Workwise app</code> ");
});

app.use(dashboardRoute);
app.use(notificationRoute);
app.use(userRoute);
app.use(projectRoute);
app.use(taskRoute);
app.use(commentRoute);
app.use(teamRoute);

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});
