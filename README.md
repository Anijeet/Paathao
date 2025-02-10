# Pathao - Ride-Hailing Application

A full-stack ride-hailing application built with MERN stack (MongoDB, Express, React, Node.js) and TypeScript.

## Features

- Real-time ride booking and tracking using Socket.IO
- Separate interfaces for users and captains (drivers)
- User authentication and authorization
- Location-based captain matching
- Fare calculation based on distance
- Real-time notifications
- Protected routes

## Tech Stack

### Backend
- Node.js + Express
- TypeScript
- MongoDB with Mongoose
- Socket.IO for real-time communication
- JWT authentication
- Google Maps API integration

### Frontend  
- React with TypeScript
- Context API for state management
- Socket.IO client
- Tailwind CSS
- Google Maps React components

## Project Structure
├── backend/ │ ├── src/ │ │ ├── controllers/ │ │ │ ├── captainController.ts # Captain authentication & management │ │ │ ├── rideController.ts # Ride booking & management │ │ │ └── userController.ts # User authentication & management │ │ ├── models/ # MongoDB schemas │ │ ├── routes/ # API routes │ │ ├── services/ # Business logic │ │ ├── socket.ts # Socket.IO setup │ │ ├── app.ts # Express app setup │ │ └── server.ts # Server initialization │ └── package.json │ └── frontend/ ├── src/ │ ├── components/ │ │ ├── CaptainDetails.tsx │ │ ├── WaitingForDriver.tsx │ │ └── ... │ ├── context/ │ │ ├── CaptainContext.tsx # Captain state management │ │ ├── SocketContext.tsx # Socket connection management │ │ └── UserContext.tsx # User state management │ ├── pages/ │ │ ├── CaptainHome.tsx │ │ ├── CaptainLogin.tsx │ │ ├── UserLogin.tsx │ │ └── ... │ └── App.tsx └── package.json


## Setup & Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/pathao.git

cd backend
npm install
cp .env.example .env  # Configure environment variables
npm run dev

cd frontend
npm install
cp .env.example .env  # Configure environment variables
npm run dev

PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GOOGLE_MAPS_API_KEY=your_api_key

API Endpoints
User Routes
POST /users/register - Register new user
POST /users/login - User login
GET /users/profile - Get user profile
Captain Routes
POST /captains/register - Register new captain
POST /captains/login - Captain login
GET /captains/profile - Get captain profile
Ride Routes
POST /rides/create - Create new ride
GET /rides/fare - Get fare estimate
POST /rides/confirm - Confirm ride
Socket Events
join - User/Captain joins socket room
new-ride - New ride notification to nearby captains
ride-accepted - Ride acceptance notification to user
ride-completed - Ride completion notification
Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

License
MIT ```



https://github.com/user-attachments/assets/478ebfb9-e0d9-46f4-a307-ac9794f8fdde


