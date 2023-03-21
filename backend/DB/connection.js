const mongoose = require('mongoose')

const connection_string = process.env.CONNECTION_STRING
mongoose.connect(connection_string).then(()=>{
    console.log("Connected successfully");
}).catch(()=>{
    console.log("connection error");
})

