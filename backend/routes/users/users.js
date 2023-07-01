const express = require("express");
const router = express.Router();

//Get all users
router.get("/users", function (req, res, next) {
  res.send("all Users");
});

//Get single user
router.get("/users/:id", function (req, res, next) {
  res.send("Signle user");
});

//create user
router.post("/user", function (req, res, next) {
  const { name, email, password, role } = req.body;
  console.log(name, email, password, role);
  res.status(200).send("Got it successfully");
});

module.exports = router;
