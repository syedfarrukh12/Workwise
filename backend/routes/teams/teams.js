import express from "express";
import {
  createTeam,
  deleteTeam,
  addMember,
  getAllTeams,
  getProjectTeam,
} from "../../controllers/TeamControllers/teamController.js";

const router = express.Router();
router.get("/teams/:managerId", getAllTeams);
router.get("/teams/:managerId/:projectId", getProjectTeam);
router.post("/team", createTeam);
router.put("/addmember/:teamId", addMember);
router.delete("/team/:id", deleteTeam);

export default router;
