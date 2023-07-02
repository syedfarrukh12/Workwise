import express from "express";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} from "../../controllers/TaskControllers/taskController.js";

const router = express.Router();

router.get("/tasks/:project_id", getTasks);
router.get("/tasks/:project_id/:task_id", getTask);
router.post("/task", createTask);
router.put("/tasks/:project_id/:task_id", updateTask);
router.delete("/tasks/:project_id/:task_id", deleteTask);
export default router;
