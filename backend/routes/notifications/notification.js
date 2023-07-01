const express = require("express");
const router = express.Router();

router.get("/notifications", function (req, res, next) {
  res.send("notifications Router");
});

module.exports = router;
