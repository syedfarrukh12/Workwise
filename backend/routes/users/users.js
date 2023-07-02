import { Router } from "express";
import {
  getUsers,
  getUser,
  createUser,
  login,
  updateUser,
  deleteUser
} from "../../controllers/UserControllers/userController.js";
const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.post("/signup", createUser);
router.post("/login", login);
router.put("/user", updateUser);
router.delete("/user/:id", deleteUser);

export default router;
