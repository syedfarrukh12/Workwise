import express from "express";

const router = express.Router();

router.get("/dashboard", function (req, res, next) {
  res.send("dashboard Router");
});

export default router;
