import { Router } from "express";
const router = Router();

router.get("/notifications", function (req, res, next) {
  res.send("notifications Router");
});

export default router;
