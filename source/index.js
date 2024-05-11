// Importing the express module for creating the server
const express = require("express");

// Creating an instance of the express application
const myServerApp = express();

// Importing dotenv to read values defined in the configuration files
const dotenv = require('dotenv');

// Now we will read the .env file of configuration file and it will create that many environment variable
dotenv.config();

// Importing mongoose module for database
const mongoose = require("mongoose");

// Importing cors library to add header to all the responses of our API
const cors = require("cors");
myServerApp.use(cors());

// Importing Router
const userRouter = require("../source/routes/userRoutes"); // userRouter from ../routes/userRoutes.js
const noteRouter = require("../source/routes/notesRoutes"); // noteRouter from ../routes/noteRoute.js

// Setting the port number for the server to listen on
// If PORT variable is not find in environment then it will pick 5000 as PORT number
const myPort = process.env.PORT || 5000;

mongoose
  .connect(
    process.env.MONGOOSE_URL // It will read the url to connect to the database from .env file
  )
  .then(() => {
    // If connection successful then start my server
    // Starting the server and listening on the specified port, if port number matched then call the callback function
    myServerApp.listen(myPort, () => {
      console.log("Server started at port " + myPort);
    });
  })
  .catch((error) => {
    console.log(error);
  });

myServerApp.use(express.json()); // To convert the user entered request into json, this needs to be done before calling end points

// Accessing end points defined in the routes folder
myServerApp.use("/users", userRouter); // If /user then go to the end point defined in userRouter
myServerApp.use("/notes", noteRouter); // If /note then go to the end point defined in noteRouter

myServerApp.use(express.json()); // To convert or parse the user entered request into json

// Setting the response for root end point for our API
myServerApp.get("/", (requestFromUserOrClient, responseFromServer) => {
  responseFromServer.send(200).send("Notes API from Ujjwal");
});
