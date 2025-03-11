# Financial Advisory Platform

A modern web application that provides personalized financial advice and investment recommendations using AI-powered insights.

## Features

- 🔒 Secure user authentication
- 📊 Financial assessment form
- 💰 Investment options analysis
- 🤖 AI-powered investment advice using Google's Gemini AI
- 📈 Real-time financial summaries
- 🎯 Personalized investment recommendations
- 📱 Responsive design for all devices

## Tech Stack

### Frontend

- React.js
- Material-UI (MUI)
- Framer Motion for animations
- React Router for navigation

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Google's Generative AI (Gemini)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/Financial-Advisory.git
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

### Authentication

- POST `/signup` - Register a new user
- POST `/login` - User login

### User Data

- GET `/user-profile` - Get user profile
- GET `/user-form-data` - Get user's financial assessment data
- POST `/submit-form` - Submit financial assessment

### AI Investment Advice

- POST `/api/investment-advice` - Get AI-powered investment advice

## Project Structure

```
Financial-Advisory/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│   └── package.json
│
└── backend/
    ├── routes/
    ├── models/
    ├── services/
    ├── middleware/
    └── server.js
```

## Security Features

- JWT-based authentication
- Password hashing using bcrypt
- Protected API routes
- CORS configuration
- Environment variable protection

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Getting a Gemini API Key

1. Go to Google AI Studio (https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click on "Get API key"
4. Create a new API key or use an existing one
5. Copy the API key and add it to your `.env` file

## License

This project is licensed under the MIT License - see the LICENSE file for details
