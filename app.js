const express=require("express");
const app=express();
const connectToDbdb=require("./db");
require("dotenv").config();
const UserRouter=require("./Routes/User.routes");

// connectiong to mongodb data base with function
// so that connection to db can be delayed to time when needed to be connected
connectToDbdb();

// using express json request body parser
app.use(express.json());

// attaching our router to the url "base/api"
app.use("/api",UserRouter);

// starting the server
app.listen(process.env.PORT || 3000,()=>
{
    console.log("listening at 3000");
});