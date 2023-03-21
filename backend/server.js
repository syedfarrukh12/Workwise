const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose')
require("dotenv").config({ path: "./config.env" });
require('./DB/connection')

const dashboardRoute = require('./routes/dashboard/dashboard');
const notificationRoute = require('./routes/notifications/notification');

const PORT = 5000;

app.use(cors());
app.get('/', (req, res) => {
    res.send('<code>Welcome to Workwise app</code> ');
})

app.use(dashboardRoute)
app.use(notificationRoute)

app.listen(PORT, (req, res)=>{
    console.log(`Server is running on port ${PORT}`);
})