const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const formRoutes = require("./routes/formRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// MongoDB Connection with retry logic
const connectWithRetry = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;
  const MAX_RETRIES = 5;
  let retries = 0;

  const connect = async () => {
    try {
      await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
      console.log("Connected to MongoDB Atlas");
    } catch (error) {
      console.error(`MongoDB connection error (attempt ${retries + 1}/${MAX_RETRIES}):`, error);
      if (retries < MAX_RETRIES) {
        retries++;
        setTimeout(connect, 5000 * retries); // Exponential backoff
      } else {
        console.error("Failed to connect to MongoDB after maximum retries");
        process.exit(1);
      }
    }
  };

  await connect();
};

// Handle MongoDB disconnection
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected. Attempting to reconnect...');
  connectWithRetry();
});

// Handle MongoDB errors
mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err);
});

// Initialize connection
connectWithRetry();

// Routes
app.use("/api/forms", formRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
