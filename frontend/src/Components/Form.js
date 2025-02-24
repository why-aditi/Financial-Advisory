import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [formData, setFormData] = useState({
    // Assets
    primaryResidence: '',
    vehicles: '',
    investments: '',
    cashSavings: '',
    // Liabilities
    mortgage: '',
    carLoans: '',
    creditCardDebt: '',
    studentLoans: '',
    // Financial Information
    monthlyIncome: '',
    monthlyExpenses: '',
    annualIncome: '',
    extraIncome: '',
    // Personal Information
    age: '',
    maritalStatus: '',
    dependents: '',
    employmentStatus: '',
    // Goals & Risk
    financialGoals: '',
    shortTermGoals: '',
    financialGoal: '',
    savings: '',
    contribution: '',
    riskTolerance: '',
    experience: '',
    // Debt & Insurance
    debtLiabilities: '',
    currentDebts: '',
    outstandingDebts: '',
    totalOutstandingDebts: '',
    insurance: '',
    insuranceCoverage: '',
    insurancePolicies: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted successfully!');
    console.log(formData);
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1 className="text-dark">Financial Assessment Form</h1>
        <p className="text-secondary">Complete this form to analyze your financial position.</p>
      </div>

      <form onSubmit={handleSubmit} className="card shadow p-4 border-success">
        {/* Assets Section */}
        <div className="mb-4">
          <h5 className="text-success">🏡 Assets</h5>
          <div className="row">
            {['Primary Residence', 'Vehicles', 'Investments', 'Cash Savings'].map((label, index) => (
              <div key={index} className="col-md-6 mb-3">
                <label className="form-label">{label}</label>
                <input
                  type="number"
                  name={label.replace(/\s+/g, '').toLowerCase()}
                  value={formData[label.replace(/\s+/g, '').toLowerCase()]}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Liabilities Section */}
        <div className="mb-4">
          <h5 className="text-danger">💳 Liabilities</h5>
          <div className="row">
            {['Mortgage', 'Car Loans', 'Credit Card Debt', 'Student Loans'].map((label, index) => (
              <div key={index} className="col-md-6 mb-3">
                <label className="form-label">{label}</label>
                <input
                  type="number"
                  name={label.replace(/\s+/g, '').toLowerCase()}
                  value={formData[label.replace(/\s+/g, '').toLowerCase()]}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Income & Expenses */}
        <div className="mb-4">
          <h5 className="text-success">💰 Financial Details</h5>
          <div className="row">
            {['Monthly Income', 'Monthly Expenses', 'Annual Income', 'Extra Income'].map((label, index) => (
              <div key={index} className="col-md-6 mb-3">
                <label className="form-label">{label}</label>
                <input
                  type="number"
                  name={label.replace(/\s+/g, '').toLowerCase()}
                  value={formData[label.replace(/\s+/g, '').toLowerCase()]}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Personal Information */}
        <div className="mb-4">
          <h5 className="text-info">👤 Personal Information</h5>
          <div className="row">
            {['Age', 'Marital Status', 'Dependents', 'Employment Status'].map((label, index) => (
              <div key={index} className="col-md-6 mb-3">
                <label className="form-label">{label}</label>
                <input
                  type="text"
                  name={label.replace(/\s+/g, '').toLowerCase()}
                  value={formData[label.replace(/\s+/g, '').toLowerCase()]}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Goals & Risk Tolerance */}
        <div className="mb-4">
          <h5 className="text-warning">🎯 Goals & Risk Tolerance</h5>
          <div className="row">
            {['Financial Goals', 'Short-Term Goals', 'Financial Goal', 'Savings', 'Contribution', 'Risk Tolerance', 'Experience'].map((label, index) => (
              <div key={index} className="col-md-6 mb-3">
                <label className="form-label">{label}</label>
                <input
                  type="text"
                  name={label.replace(/\s+/g, '').toLowerCase()}
                  value={formData[label.replace(/\s+/g, '').toLowerCase()]}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Debt & Insurance */}
        <div className="mb-4">
          <h5 className="text-dark">📜 Debt & Insurance</h5>
          <div className="row">
            {['Debt Liabilities', 'Current Debts', 'Outstanding Debts', 'Total Outstanding Debts', 'Insurance', 'Insurance Coverage', 'Insurance Policies'].map((label, index) => (
              <div key={index} className="col-md-6 mb-3">
                <label className="form-label">{label}</label>
                <input
                  type="text"
                  name={label.replace(/\s+/g, '').toLowerCase()}
                  value={formData[label.replace(/\s+/g, '').toLowerCase()]}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="btn btn-dark px-4">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
