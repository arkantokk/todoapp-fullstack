Planner App
A full-stack task management application built with the MERN stack, focusing on high performance and clean architecture.

Tech Stack
Frontend: React, TypeScript.

Backend: Node.js, Express.

Database: MongoDB.

Deployment: Railway (Backend), Vercel (Frontend).

Key Features

Architecture: Developed using Separation of Concerns. The logic is divided into Controllers and Services to ensure maintainability and easier testing.

Security: Implemented JWT-based authentication using httpOnly cookies for secure session management.

Installation and Setup
Clone the repository.

Create a .env file in the backend folder with the following variables:
PORT=5000
MONGO_URI= your url for mongodb atlas
JWT_ACCESS_SECRET,
JWT_REFRESH_SECRET.

Run npm install and npm start in both the frontend and backend directories.
