const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((error) => console.error('Error connecting to MongoDB Atlas:', error));

const formSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  age: Number,
  maritalStatus: String,
  dependents: String,
  employmentStatus: String,
  annualIncome: String,
  extraIncome: String,
  financialGoals: String,
  shortTermGoals: String,
  financialGoal: String,
  savings: String,
  contribution: String,
  investments: String,
  riskTolerance: String,
  experience: String,
  debtLiabilities: String,
  currentDebts: String,
  outstandingDebts: String,
  totalOutstandingDebts: String,
  insurance: String,
  insuranceCoverage: String,
  insurancePolicies: String
}, { collection: 'Form Submit' });

const FormData = mongoose.model('FormData', formSchema);

// Signup endpoint
app.post('/signup', async (req, res) => {
  const { email, ...formData } = req.body;

  try {
    const existingUser = await FormData.findOne({ email });

    if (existingUser) {
      return res.status(400).send({ message: 'User already exists' });
    }

    const newFormData = new FormData({ email, ...formData });
    await newFormData.save();

    res.status(200).send({ message: 'Signup successful, redirecting to dashboard' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).send('Error during signup');
  }
});

// Form submission endpoint
app.post('/submit', async (req, res) => {
  const formData = new FormData(req.body);

  try {
    await formData.save();
    res.status(200).send({ message: 'Form data saved' });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).send('Error saving form data');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
