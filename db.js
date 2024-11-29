const mongoose=require("mongoose");
require("dotenv").config()

// function to connect to the database when necessary
async function connectToDb()
{
    try{
        await mongoose.connect(process.env.DB_STRING);
        console.log("conntected to db");
    }
    catch(err)
    {
        console.log("error occured while connecting db",err);
    }
    
    // event listener for when the db is connected
    mongoose.connection.on("connected",()=>
    {
        console.log("connected to db");
    })

    // event listener for when the db throws any error 
    mongoose.connection.on("error",(err)=>{
        console.log(err);
    })


    // event listener when the db disconnects
    mongoose.connection.on("disconnected",()=>
    {
        console.log("db disconnected");
    })
}
// exporting the function only
module.exports=connectToDb

