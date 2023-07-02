import express from "express";
import {
  getProjects,
  getProject,
  createProject,
} from "../../controllers/ProjectControllers/projectControllers.js";

const router = express.Router();

router.get("/projects", getProjects);

router.get("/projects/:id", getProject);

router.post("/project", createProject);

export default router;
