import express from "express";
import {
  getComments,
  editComment,
  deleteComment,
  createComment
} from "../../controllers/CommentControllers/commentController.js";

const router = express.Router();

router.get("/comments/:taskId", getComments);
router.put("/comments/:taskId/:commentId", editComment);
router.delete("/comments/:taskId/:commentId", deleteComment);
router.post("/comment", createComment);

export default router;
