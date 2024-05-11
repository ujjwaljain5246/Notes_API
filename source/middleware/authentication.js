/*
Middleware in web development acts as a bridge between incoming requests and outgoing responses in an application. It's a function or a set of functions that intercepts and processes these requests and responses before they reach their final destination.

Here's a brief explanation of how middleware works:

1) Intercepting Requests: When a request is made to a server, it passes through one  
   or more middleware functions before reaching the intended route handler. Middleware can inspect and modify the request object, perform authentication, validation, logging, or any other pre-processing tasks.
2) Processing Request: Each middleware function has the ability to perform its 
   specific task on the request object, such as adding data, modifying headers, or checking for authentication tokens.
3) Passing Control: After each middleware function completes its task, it can either 
   pass control to the next middleware function in the chain by calling the next() function or terminate the request-response cycle by sending a response back to the client.
4) Handling Response: Similarly, middleware functions can also intercept the 
   response before it's sent back to the client. They can modify the response object, add headers, or perform post-processing tasks.

Middleware allows developers to modularize the logic of their applications, making it easier to manage and maintain complex codebases. It promotes reusability and separation of concerns by breaking down the application logic into smaller, composable units.

Common use cases for middleware include authentication, authorization, error handling, request logging, data validation, compression, and caching. By chaining together multiple middleware functions, developers can construct powerful pipelines to handle various aspects of request processing in their applications.
*/

const jsonWebToken = require("jsonwebtoken");

// Defining secret key to generate token for each user validation
SECRET_KEY = "NOTES_API"

const authentication = (requestFromUserOrClient, responseFromServer,  next) =>{
    try {
        // Check if user is passing token or not with the request
        let token = requestFromUserOrClient.headers.authorization;
        if(token){
            // First of all split the token
            token = token.split(" ")[1];
            // Verification is going on
            let user = jsonWebToken.verify(token, SECRET_KEY);
            // After successful verification, user will hold email and userId which we were setting in userController.js
            // We will set that userId to the requestFromUserOrClient so that will be able to authenticate everyUser from that 
            // before accessing notes.
            requestFromUserOrClient.userId = user.id;

        } else {
            return responseFromServer.status(401).json({message: "You are not an authorized user to access this"});
        }

        next();

    } catch (error) {
        console.log(error);
        return responseFromServer.status(402).json({message: "You are not an authorized user to access this"});
    }
}

module.exports = authentication;