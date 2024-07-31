const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const FormEntry = require("./models/formEntry");

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error("Error connecting to MongoDB Atlas:", error));

// Signup endpoint
app.post("/signup", async (req, res) => {
  console.log("Received signup data:", req.body);
  const { email } = req.body;

  try {
    const existingUser = await FormEntry.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new entry with the email
    const newFormEntry = new FormEntry({ email });
    await newFormEntry.save();

    // Respond with a URL to redirect the user to the form
    res.status(200).json({ message: "Signup successful", formURL: "http://localhost:3000/form" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Error during signup" });
  }
});

// Form submission endpoint
app.post("/submit", async (req, res) => {
  const { email, ...formData } = req.body;

  try {
    const updatedFormEntry = await FormEntry.findOneAndUpdate(
      { email },
      { $set: formData },
      { new: true, runValidators: true }
    );

    if (!updatedFormEntry) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Form data updated successfully" });
  } catch (error) {
    console.error("Error updating form data:", error);
    res.status(500).json({ message: "Error updating form data" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
