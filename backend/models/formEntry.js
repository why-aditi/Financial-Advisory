const mongoose = require('mongoose');

const formEntrySchema = new mongoose.Schema({
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
});

module.exports = mongoose.model('FormEntry', formEntrySchema);
