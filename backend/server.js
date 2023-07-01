const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./config.env" });
require("./DB/connection");

const dashboardRoute = require("./routes/dashboard/dashboard");
const notificationRoute = require("./routes/notifications/notification");
const userRoute = require("./routes/users/users");

//Port Constant
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("<code>Welcome to Workwise app</code> ");
});

app.use(dashboardRoute);
app.use(notificationRoute);
app.use(userRoute);

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});
