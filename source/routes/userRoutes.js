// All end points related to the user's login and signup will be mentioned here

// Importing express 
const express = require("express");

// Importing all the function of the userController which will be called on each end point hitting
const { signUp, logIn } = require("../controller/userController");
const userRouter = express.Router();

userRouter.post("/signup", signUp); // If endpoint is /users/signup then call the signUp function from the userController.js
userRouter.post("/login", logIn);// If endpoint is /users/login then call the logIn function from the userController.js

module.exports = userRouter;