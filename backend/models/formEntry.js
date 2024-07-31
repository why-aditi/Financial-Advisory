const mongoose = require('mongoose');

const formEntrySchema = new mongoose.Schema({
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
  insurancePolicies: String,
}, { collection: "formsubmit" });  // Avoid spaces and use lowercase for collection names

module.exports = mongoose.model('FormEntry', formEntrySchema);
