const express=require("express");
const UserRouter=express.Router();
const {signup,signin,verify,adminController,moderatorController,customerController} = require("../Controllers/Auth.controller");
const authentication = require("../Middlewares/Authentication");
const authorization=require("../Middlewares/Authorization");


// sign in route to handle sign in
// it requires to have username, password and role in its body
UserRouter.post("/signin",signin);
// sign up route to handle sign up
// it requires to have username, password and role in its body
UserRouter.post("/signup",signup);

// used to verify the token and check if the user exist in db
// requires only the token
UserRouter.get("/",authentication,verify);

// dummy url to check the authorization
// this will only work if the user is a admin
UserRouter.get("/admin",authorization("admin"),adminController);

// this will only work if the user is a moderator
UserRouter.get("/moderator",authorization("moderator"),moderatorController);

// this will only work if the user is customer
UserRouter.get("/customer",authorization("customer"),customerController);

module.exports=UserRouter;