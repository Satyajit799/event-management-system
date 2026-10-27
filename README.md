# Event Management System

A full-stack web application for managing events and handling attendee bookings. The system is designed to organize event information, track seat availability, and manage booking operations through a web-based interface.

## Features

- Event listing and management
- Event booking functionality
- Seat capacity and availability tracking
- Booking cancellation and status management
- REST API integration
- Database-backed event and booking records
- React-based user interface


## Technology Stack

**Frontend**
- React.js
- JavaScript
- CSS

**Backend**
- Node.js
- Express.js
- REST APIs

**Database**
- MongoDB
- Mongoose

**Tools**
- Git
- GitHub
- Postman
- Visual Studio Code

## Project Structure

```text
Event-Management-System/
├── client/
│   └── ...
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
├── .gitignore
└── README.md
```

Adjust the structure above to match your actual project.

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB or a MongoDB Atlas database

### 1. Clone the repository

```bash
git clone https://github.com/Satyajit799/Event-Management-System.git
cd Event-Management-System
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

Create a `.env` file using the environment variables required by your backend.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Use the actual variable names required by your application. Do not commit real credentials.

Start the backend using the script defined in your `server/package.json`. For example:

```bash
npm run dev
```

### 3. Install frontend dependencies

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Follow the local development URL displayed by your frontend development server.

## Booking Logic

The backend can manage event capacity and booking status so that bookings respect seat availability.

Describe the exact booking and cancellation behavior implemented in your application here.

## Future Improvements

Potential enhancements include:

- Online payment integration
- Event search and filtering
- Email booking confirmations
- An administrative dashboard
- Deployment to a cloud platform

These are planned enhancements, not claims about existing features.

## Author

**Satyajit Mohanty**

MCA Student | Aspiring Full Stack Developer

GitHub: [Satyajit799](https://github.com/Satyajit799)

## License

Add a license if you intend to distribute this project under specific terms.