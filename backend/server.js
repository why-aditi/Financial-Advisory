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

app.post('/submit', async (req, res) => {
  const formData = new FormData(req.body);

  try {
    await formData.save();
    // Assuming getLLMResponse is defined somewhere else in your code
    const llmResponse = await getLLMResponse(JSON.stringify(req.body));
    res.status(200).send({ message: 'Form data saved', llmResponse });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).send('Error saving form data');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
