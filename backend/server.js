const express = require("express");
const app = express();
const dashboardRoute = require('./routes/dashboard/dashboard');
const notificationRoute = require('./routes/notifications/notification');


const PORT = 5000;

app.get('/', (req, res) => {
    res.send('<code>Welcome to Workwise app</code> ');
})

app.use(dashboardRoute)
app.use(notificationRoute)

app.listen(PORT, (req, res)=>{
    console.log(`Server is running on port ${PORT}`);
})