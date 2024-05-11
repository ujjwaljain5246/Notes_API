// Which function we want to call from router's get or post method, that will be written here in controller
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jsonWebToken = require("jsonwebtoken");

// Defining secret key to generate token for each user validation
SECRET_KEY = process.env.SECRET_KEY

// signUp should be async because it check first for existing user and then create new one if not existing. Means related to database
const signUp = async (requestFromUserOrClient, responseFromServer) =>{

    // Check if existing user
    // Generate Hash password, we don't store direct readable password for security purpose
    // Create new user
    // Then generate token

    // To get the user's entered details
    // But we need to convert those details into json first i.e. convert request body into json
    // In index.js file, myServerApp.use(express.json()) is responsible for this task
    const {userName, password, email} = requestFromUserOrClient.body;

    try {
        // Check if existing user
        // We will use await because it will check the database, after executing this line only it will go ahead
        const existingUser = await userModel.findOne({email:email}); // await should be used only when parent function is async
        if(existingUser){
            return responseFromServer.status(400).json({message: "User already exit with `email` email ID"});
        }

        // Generating Hash password
        const generatedHashPassword = await bcrypt.hash(password, 10);

        // User creating
        const result = await userModel.create({
            email : email,
            password : generatedHashPassword,
            userName : userName
        });

        // Generating token for each user to validate the user
        // When a user will be created then userModel will generate a unique ID for that user and we can access that id via
        // result._id, So we are passing id as result._id
        const eachUserToken = jsonWebToken.sign({email : result.email, id : result._id}, SECRET_KEY);

        // Now return the response from the server
        return responseFromServer.status(201).json({user: result, userToken: eachUserToken});

    } catch (error) {
        console.log(error);
        return responseFromServer.status(501).json({message : "Something went wrong"});
    }

};

// This will be also async because it will find user first and then match password so it should be async
const logIn = async (requestFromUserOrClient, responseFromServer) =>{

    // Receiving email and password from the requestFromUserOrClient.body
    const {email, password} = requestFromUserOrClient.body;

    try {
        // Check if user is existing or not
        const existingUser = await userModel.findOne({email:email}); // await should be used only when parent function is async
        if(!existingUser){
            return responseFromServer.status(404).json({message: "User not found"});
        }

        // Match the credential to login, and if not then send invalid credential. Await is necessary to wait till it will match the password
        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordMatch){
            return responseFromServer.status(401).json({message: "Invalid credential"});
        }

        // Now make login successful
        // Generate token first
        const eachUserToken = jsonWebToken.sign({email : existingUser.email, id : existingUser._id}, SECRET_KEY);
        return responseFromServer.status(400).json({user:existingUser, userToken:eachUserToken});
    } catch (error) {
        
    }
};

module.exports = {signUp, logIn};