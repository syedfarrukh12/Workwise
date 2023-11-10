import express from "express";
import {
  createTeam,
  deleteTeam,
  addMember,
  getAllTeams,
  getProjectTeam,
  removeMember,
  createMember,
} from "../../controllers/TeamControllers/teamController.js";

const router = express.Router();
router.get("/teams/:managerId", getAllTeams); //getting all the teams for a manager
router.get("/teams/:managerId/:projectId", getProjectTeam);
router.post("/team", createTeam); //create team
router.post("/member/:teamId", createMember); //create member for existing team
router.put("/addmember/:teamId", addMember); //adding member to the team
router.put("/removemember/:teamId", removeMember); //adding member from the team
router.delete("/team/:id", deleteTeam);

export default router;
