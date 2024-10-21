# User Management System

##Overview
This project is a user management system built with Node.js, Express, TypeScript, and Mongoose. It features both public and protected routes, allowing users to register, log in, and view their profiles. Administrators can create, update, delete, and fetch users. The system also includes a service that logs users who registered in the last 7 days when the server starts.

##Features
User Registration: Users can register by providing a name, email, and password.
User Login: Users can log in and receive a JWT for authenticated actions.
User Profile: Authenticated users can view their profile details.
Admin CRUD Operations: Admins can create, update, delete, and fetch users.
Recent Users Logging: On server startup, logs all users registered in the last 7 days.

## Technologies Used

- Node.js
- Express.js
- MongoDB (using Mongoose)
- TypeScript
- bcryptjs (for password hashing)
- jsonwebtoken (for authentication)

##Middleware
authMiddleware: Protects routes, ensuring the user is authenticated.      
adminMiddleware: Restricts access to admin-only actions on basis of role.

##7-Day User Logging Service
Description: When the server starts, it logs users who registered in the last 7 days to the console.
Implementation: This service fetches users from the database using a date filter and logs the data.

## API Endpoints
###User Module Riutes
-User Registration
  POST /api/users/register
  Request Body:
  json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "yourpassword"
  }

-User Login
  POST /api/users/login
  Request Body:
  json
  {
    "email": "john@example.com",
    "password": "yourpassword"
  }
  
-Get User Profile
  GET /api/users/profile
  Authorization: Bearer Token required in the header.


###Admin Routes (Protected by Auth and Admin Middlewares)
-POST /admin/users
Creates a new user (admin only).
Request Body:
json
{
  "name": "New User",
  "email": "newuser@example.com",
  "password": "newpassword",
  "role": "admin"
}
Response: 201 Created

-GET /admin/users
Fetches all users (with pagination, filtering by role, name, or email).
Query Params: ?page=1&limit=10&role=user&name=John&email=example@example.com
Response: 200 OK

-PUT /admin/users/:id
Updates a user by ID (admin only).
Request Body:
json
{
  "name": "Updated Name",
  "email": "updated@example.com",
  "role": "user"
}
Response: 200 OK

-DELETE /admin/users/:id
Deletes a user by ID (admin only).
Response: 200 OK


####Project Setup
-clone the Project 
use git clone https://github.com/abhishek0tyagi/NamahaOmAssignmt.git

-Install Dependencies
npm install

-Run application
npm run start
  
--Note:check env variable once if server not start.