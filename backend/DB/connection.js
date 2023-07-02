import { connect } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

const connection_string = process.env.CONNECTION_STRING
connect(connection_string).then(()=>{
    console.log("Connected successfully");
}).catch((error)=>{
    console.log("connection error");
    console.log(error)
})

