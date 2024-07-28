import React, { useState } from "react";
import { Button, FormControl } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Form.css";

export default function Form() {
  const [formData, setFormData] = useState({
    age: "",
    maritalStatus: "",
    dependents: "",
    employmentStatus: "",
    annualIncome: "",
    extraIncome: "",
    financialGoals: "",
    shortTermGoals: "",
    financialGoal: "",
    savings: "",
    contribution: "",
    investments: "",
    riskTolerance: "",
    experience: "",
    debtLiabilities: "",
    currentDebts: "",
    outstandingDebts: "",
    totalOutstandingDebts: "",
    insurance: "",
    insuranceCoverage: "",
    insurancePolicies: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleButtonClick = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.age || isNaN(formData.age) || formData.age <= 0) {
      formErrors.age = "Please enter a valid age.";
    }
    if (!formData.annualIncome || isNaN(formData.annualIncome)) {
      formErrors.annualIncome = "Please enter a valid annual income.";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Please fix the errors before submitting.");
      return;
    }

    const allFieldsFilled = Object.values(formData).every(
      (value) => value !== ""
    );
    if (!allFieldsFilled) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    const email = localStorage.getItem("userEmail");
    if (!email) {
      alert("No user email found. Please sign up again.");
      navigate("/signup");
      return;
    }

    console.log("Submitting form data:", { email, formData }); // Log the data

    try {
      const response = await fetch("http://localhost:5000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, formData }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.msg);
        navigate(`/dashboard/${email}`);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Financial Form</h1>

        <label>
          What is your age?
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="Age"
          />
          {errors.age && <span className="error">{errors.age}</span>}
        </label>

        <FormControl component="fieldset">
          <label>What is your marital status?</label>
          <div className="button-group">
            <Button
              className="button"
              variant={
                formData.maritalStatus === "Married" ? "contained" : "outlined"
              }
              onClick={() => handleButtonClick("maritalStatus", "Married")}
            >
              Married
            </Button>
            <Button
              className="button"
              variant={
                formData.maritalStatus === "Unmarried"
                  ? "contained"
                  : "outlined"
              }
              onClick={() => handleButtonClick("maritalStatus", "Unmarried")}
            >
              Unmarried
            </Button>
          </div>
        </FormControl>

        <FormControl component="fieldset">
          <label>Do you have any dependents?</label>
          <div className="button-group">
            <Button
              className="button"
              variant={formData.dependents === "Yes" ? "contained" : "outlined"}
              onClick={() => handleButtonClick("dependents", "Yes")}
            >
              Yes
            </Button>
            <Button
              className="button"
              variant={formData.dependents === "No" ? "contained" : "outlined"}
              onClick={() => handleButtonClick("dependents", "No")}
            >
              No
            </Button>
          </div>
        </FormControl>

        <FormControl component="fieldset">
          <label>What is your current employment status?</label>
          <div className="button-group">
            <Button
              className="button"
              variant={
                formData.employmentStatus === "Employed"
                  ? "contained"
                  : "outlined"
              }
              onClick={() => handleButtonClick("employmentStatus", "Employed")}
            >
              Employed
            </Button>
            <Button
              className="button"
              variant={
                formData.employmentStatus === "Self-Employed"
                  ? "contained"
                  : "outlined"
              }
              onClick={() =>
                handleButtonClick("employmentStatus", "Self-Employed")
              }
            >
              Self-Employed
            </Button>
            <Button
              className="button"
              variant={
                formData.employmentStatus === "Unemployed"
                  ? "contained"
                  : "outlined"
              }
              onClick={() =>
                handleButtonClick("employmentStatus", "Unemployed")
              }
            >
              Unemployed
            </Button>
            <Button
              className="button"
              variant={
                formData.employmentStatus === "Retired"
                  ? "contained"
                  : "outlined"
              }
              onClick={() => handleButtonClick("employmentStatus", "Retired")}
            >
              Retired
            </Button>
          </div>
        </FormControl>

        <label>
          What is your annual income?
          <input
            type="text"
            name="annualIncome"
            value={formData.annualIncome}
            onChange={handleInputChange}
            placeholder="Annual Income"
          />
          {errors.annualIncome && (
            <span className="error">{errors.annualIncome}</span>
          )}
        </label>

        <label>
          Do you have any extra source of income?
          <input
            type="text"
            name="extraIncome"
            value={formData.extraIncome}
            onChange={handleInputChange}
            placeholder="Extra Source of Income"
          />
        </label>

        <label>
          Financial Goals
          <input
            type="text"
            name="financialGoals"
            value={formData.financialGoals}
            onChange={handleInputChange}
            placeholder="Financial Goals"
          />
        </label>

        <label>
          Short-term Goals
          <input
            type="text"
            name="shortTermGoals"
            value={formData.shortTermGoals}
            onChange={handleInputChange}
            placeholder="Short-term Goals"
          />
        </label>

        <label>
          What is your Financial Goal for next 1-5 years?
          <input
            type="text"
            name="financialGoal"
            value={formData.financialGoal}
            onChange={handleInputChange}
            placeholder="Buying a house, start a business, etc."
          />
        </label>

        <FormControl component="fieldset">
          <label>How much do you currently have in savings?</label>
          <div className="button-group">
            <Button
              className="button"
              variant={
                formData.savings === "0-1,00,000" ? "contained" : "outlined"
              }
              onClick={() => handleButtonClick("savings", "0-1,00,000")}
            >
              0-1,00,000
            </Button>
            <Button
              className="button"
              variant={
                formData.savings === "1,00,000-10,00,000"
                  ? "contained"
                  : "outlined"
              }
              onClick={() => handleButtonClick("savings", "1,00,000-10,00,000")}
            >
              1,00,000-10,00,000
            </Button>
            <Button
              className="button"
              variant={
                formData.savings === "10,00,000-25,00,000"
                  ? "contained"
                  : "outlined"
              }
              onClick={() =>
                handleButtonClick("savings", "10,00,000-25,00,000")
              }
            >
              10,00,000-25,00,000
            </Button>
            <Button
              className="button"
              variant={
                formData.savings === "25,00,000-50,00,000"
                  ? "contained"
                  : "outlined"
              }
              onClick={() =>
                handleButtonClick("savings", "25,00,000-50,00,000")
              }
            >
              25,00,000-50,00,000
            </Button>
            <Button
              className="button"
              variant={
                formData.savings === "50,00,000+" ? "contained" : "outlined"
              }
              onClick={() => handleButtonClick("savings", "50,00,000+")}
            >
              50,00,000+
            </Button>
          </div>
        </FormControl>

        <FormControl component="fieldset">
          <label>
            What is your current level of contribution to savings each month?
          </label>
          <div className="button-group">
            <Button
              className="button"
              variant={
                formData.contribution === "Below 5,000"
                  ? "contained"
                  : "outlined"
              }
              onClick={() => handleButtonClick("contribution", "Below 5,000")}
            >
              Below 5,000
            </Button>
            <Button
              className="button"
              variant={
                formData.contribution === "5,000-10,000"
                  ? "contained"
                  : "outlined"
              }
              onClick={() => handleButtonClick("contribution", "5,000-10,000")}
            >
              5,000-10,000
            </Button>
            <Button
              className="button"
              variant={
                formData.contribution === "10,000-25,000"
                  ? "contained"
                  : "outlined"
              }
              onClick={() => handleButtonClick("contribution", "10,000-25,000")}
            >
              10,000-25,000
            </Button>
            <Button
              className="button"
              variant={
                formData.contribution === "25,000-50,000"
                  ? "contained"
                  : "outlined"
              }
              onClick={() => handleButtonClick("contribution", "25,000-50,000")}
            >
              25,000-50,000
            </Button>
            <Button
              className="button"
              variant={
                formData.contribution === "Above 50,000"
                  ? "contained"
                  : "outlined"
              }
              onClick={() => handleButtonClick("contribution", "Above 50,000")}
            >
              Above 50,000
            </Button>
          </div>
        </FormControl>

        <label>
          What are your current investments?
          <input
            type="text"
            name="investments"
            value={formData.investments}
            onChange={handleInputChange}
            placeholder="Investments"
          />
        </label>

        <FormControl component="fieldset">
          <label>What is your risk tolerance?</label>
          <div className="button-group">
            <Button
              className="button"
              variant={
                formData.riskTolerance === "Conservative"
                  ? "contained"
                  : "outlined"
              }
              onClick={() => handleButtonClick("riskTolerance", "Conservative")}
            >
              Conservative
            </Button>
            <Button
              className="button"
              variant={
                formData.riskTolerance === "Moderate" ? "contained" : "outlined"
              }
              onClick={() => handleButtonClick("riskTolerance", "Moderate")}
            >
              Moderate
            </Button>
            <Button
              className="button"
              variant={
                formData.riskTolerance === "Aggressive"
                  ? "contained"
                  : "outlined"
              }
              onClick={() => handleButtonClick("riskTolerance", "Aggressive")}
            >
              Aggressive
            </Button>
          </div>
        </FormControl>

        <FormControl component="fieldset">
          <label>How much investment experience do you have?</label>
          <div className="button-group">
            <Button
              className="button"
              variant={
                formData.experience === "None" ? "contained" : "outlined"
              }
              onClick={() => handleButtonClick("experience", "None")}
            >
              None
            </Button>
            <Button
              className="button"
              variant={
                formData.experience === "Basic" ? "contained" : "outlined"
              }
              onClick={() => handleButtonClick("experience", "Basic")}
            >
              Basic
            </Button>
            <Button
              className="button"
              variant={
                formData.experience === "Intermediate"
                  ? "contained"
                  : "outlined"
              }
              onClick={() => handleButtonClick("experience", "Intermediate")}
            >
              Intermediate
            </Button>
            <Button
              className="button"
              variant={
                formData.experience === "Advanced" ? "contained" : "outlined"
              }
              onClick={() => handleButtonClick("experience", "Advanced")}
            >
              Advanced
            </Button>
          </div>
        </FormControl>

        <FormControl component="fieldset">
          <label>Do you have any debt/liabilities?</label>
          <div className="button-group">
            <Button
              className="button"
              variant={
                formData.debtLiabilities === "Yes" ? "contained" : "outlined"
              }
              onClick={() => handleButtonClick("debtLiabilities", "Yes")}
            >
              Yes
            </Button>
            <Button
              className="button"
              variant={
                formData.debtLiabilities === "No" ? "contained" : "outlined"
              }
              onClick={() => handleButtonClick("debtLiabilities", "No")}
            >
              No
            </Button>
          </div>
        </FormControl>

        <label>
          What type of debts do you have?
          <input
            type="text"
            name="currentDebts"
            value={formData.currentDebts}
            onChange={handleInputChange}
            placeholder="Current Debts"
          />
        </label>

        <label>
          What is your total outstanding debts amount?
          <input
            type="text"
            name="outstandingDebts"
            value={formData.outstandingDebts}
            onChange={handleInputChange}
            placeholder="Outstanding Debts Amount"
          />
        </label>

        <label>
          What is your total outstanding debts amount?
          <input
            type="text"
            name="totalOutstandingDebts"
            value={formData.totalOutstandingDebts}
            onChange={handleInputChange}
            placeholder="Total Outstanding Debts"
          />
        </label>

        <FormControl component="fieldset">
          <label>Do you have any insurance?</label>
          <div className="button-group">
            <Button
              className="button"
              variant={formData.insurance === "Yes" ? "contained" : "outlined"}
              onClick={() => handleButtonClick("insurance", "Yes")}
            >
              Yes
            </Button>
            <Button
              className="button"
              variant={formData.insurance === "No" ? "contained" : "outlined"}
              onClick={() => handleButtonClick("insurance", "No")}
            >
              No
            </Button>
          </div>
        </FormControl>

        <label>
          What type of insurance coverage do you have?
          <input
            type="text"
            name="insuranceCoverage"
            value={formData.insuranceCoverage}
            onChange={handleInputChange}
            placeholder="Insurance Coverage"
          />
        </label>

        <label>
          How many insurance policies do you have?
          <input
            type="text"
            name="insurancePolicies"
            value={formData.insurancePolicies}
            onChange={handleInputChange}
            placeholder="Number of Policies"
          />
        </label>

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
