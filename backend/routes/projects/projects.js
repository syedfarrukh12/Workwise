import express from "express";
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
} from "../../controllers/ProjectControllers/projectControllers.js";

const router = express.Router();

router.get("/projects", getProjects);
router.get("/projects/:id", getProject);
router.post("/project", createProject);
router.put("/project/:id", updateProject);
router.delete("/project/:id", deleteProject);

export default router;
