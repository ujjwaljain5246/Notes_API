# Notes API

Welcome to the Notes API! This API will allow users to create a login and signup page, manage their notes by creating, deleting, updating, and fetching notes from a MongoDB database using ExpressJS. This API utilizes various Node.js libraries such as Express, jsonwebtoken, nodemon, bcrypt, dotenv, and mongoose.

## Software Required

To work with this API, you'll need the following software installed:

- **VSCode**: Use VSCode as your code editor.
- **Postman**: Utilize Postman for testing the API endpoints.
- **NodeJS**: Ensure NodeJS is installed on your system to run ExpressJS.

## Project Structure

The main file of this project is `index.js`, as defined in the `package.json` file. Other key files and directories include:

- `index.js`: The main entry point of the application.
- `package.json`: Contains metadata and dependencies for the project.
- `routes/`: Directory containing all endpoints definitions.
- `models/`: Directory containing Mongoose schemas for database models.
- `middlewares/`: Directory containing middleware functions.

## Dependencies

This project uses the following Node.js libraries:

- **ExpressJS**: A web application framework for Node.js.
- **jsonwebtoken**: For generating and verifying JSON Web Tokens (JWT) for user authentication.
- **nodemon**: Automatically restarts the server when changes are detected.
- **bcrypt**: Used for hashing passwords for secure storage.
- **dotenv**: Loads environment variables from a `.env` file.
- **mongoose**: A MongoDB object modeling tool designed to work in an asynchronous environment.

## Authentication and Authorization

Users can sign up and log in to the system to access their notes.
Authentication is implemented using JWT tokens.
Endpoints requiring user authentication use middleware to verify JWT tokens in the authorization header.

## AWS Integration

This project is integrated with AWS as the cloud provider. Ensure that you have the necessary AWS credentials configured for the project to function correctly.

## Usage

1. Clone the repository to your local machine.
2. Install dependencies using `npm install`.
3. Set up your environment variables by creating a `.env` file and adding necessary configurations such as MongoDB URI, JWT secret, and AWS credentials.
4. Run the server using `npm start`.
5. Use Postman or any other API testing tool to interact with the API endpoints.

## Important Notes

- Replace the admin username and password in the codebase with your own credentials.
- Certain endpoints require authentication through the authorization header. Ensure to include the JWT token obtained after login in the request header.

## Endpoints

Below are the key endpoints available in the API:

- **POST /signup**: Register a new user.
- **POST /login**: Log in as an existing user.
- **GET /notes**: Retrieve all notes for the authenticated user.
- **POST /notes**: Create a new note for the authenticated user.
- **PUT /notes/:id**: Update a specific note for the authenticated user.
- **DELETE /notes/:id**: Delete a specific note for the authenticated user.

### Feel free to contact in case of any doubt....
