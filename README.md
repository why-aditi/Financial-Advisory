# Financial Advisory Platform

A comprehensive financial assessment and advisory platform built with React, Node.js, Express, and MongoDB. This application helps users track their financial health, set goals, and manage their assets and liabilities.

## Features

- **User Authentication**: Secure signup and login functionality
- **Multi-step Financial Assessment Form**:
  - Personal Information
  - Financial Status
  - Assets & Liabilities
  - Goals & Risk Assessment
  - Debt & Insurance Coverage
- **Interactive Dashboard**: View and track your financial data
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Material UI Components**: Modern and user-friendly interface

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

## Project Structure

```
Financial-Advisory/
├── frontend/                # React frontend application
│   ├── src/
│   │   ├── Components/     # React components
│   │   ├── App.js         # Main application component
│   │   └── index.js       # Entry point
│   ├── package.json
│   └── README.md
│
├── backend/                # Node.js/Express backend
│   ├── models/            # MongoDB models
│   ├── server.js         # Express server setup
│   └── package.json
│
└── README.md
```

## Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd Financial-Advisory
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

## Configuration

1. Create a `.env` file in the backend directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

2. Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:5000
```

## Running the Application

1. Start the backend server:

```bash
cd backend
npm start
```

2. Start the frontend development server:

```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

- `POST /signup` - User registration
- `POST /login` - User authentication
- `POST /submit-form` - Submit financial assessment form
- `GET /user-form-data` - Retrieve user's form data
- `GET /dashboard-data` - Retrieve dashboard information

## Technologies Used

- **Frontend**:

  - React.js
  - Material UI
  - Framer Motion
  - React Router
  - Axios

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
  - JWT Authentication
  - bcryptjs

## Security Features

- JWT-based authentication
- Password hashing
- Protected routes
- Input validation
- CORS protection

https://github.com/user-attachments/assets/0e45d87a-ccf4-4680-abf7-c18ccab79343
