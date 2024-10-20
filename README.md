# User Management System

A User Management System built with TypeScript, Express, and Mongoose, providing functionality for user registration, login, and profile management.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)

## Features

- User registration with password hashing.
- User login with JWT-based authentication.
- Retrieve user profile information.
- Error handling for common scenarios.

## Technologies Used

- Node.js
- Express.js
- MongoDB (using Mongoose)
- TypeScript
- bcryptjs (for password hashing)
- jsonwebtoken (for authentication)


## API Endpoints
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
