const express = require("express");
const router = express.Router();

router.get("/dashboard", function (req, res, next) {
  res.send("dashboard Router");
});

module.exports = router;
