import React, { useState } from "react";
import { Button, FormControl } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import from react-router-dom
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

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleButtonClick = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allFieldsFilled = Object.values(formData).every(
      (value) => value !== ""
    );
    if (!allFieldsFilled) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    const email = localStorage.getItem("userEmail"); // Retrieve email from local storage
    if (!email) {
      alert("No user email found. Please sign up again.");
      navigate("/signup"); // Redirect to sign-up if no email found
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/submit-form", {
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
                formData.savings === "50,00,000-1,00,00,000"
                  ? "contained"
                  : "outlined"
              }
              onClick={() =>
                handleButtonClick("savings", "50,00,000-1,00,00,000")
              }
            >
              50,00,000-1,00,00,000
            </Button>
            <Button
              className="button"
              variant={
                formData.savings === "1,00,00,000 and above"
                  ? "contained"
                  : "outlined"
              }
              onClick={() =>
                handleButtonClick("savings", "1,00,00,000 and above")
              }
            >
              1,00,00,000 and above
            </Button>
          </div>
        </FormControl>

        <FormControl component="fieldset">
          <label>How much do you contribute to your savings?</label>
          <div className="button-group">
            <Button
              className="button"
              variant={
                formData.contribution === "0-10,000" ? "contained" : "outlined"
              }
              onClick={() => handleButtonClick("contribution", "0-10,000")}
            >
              0-10,000
            </Button>
            <Button
              className="button"
              variant={
                formData.contribution === "10,000-50,000"
                  ? "contained"
                  : "outlined"
              }
              onClick={() => handleButtonClick("contribution", "10,000-50,000")}
            >
              10,000-50,000
            </Button>
            <Button
              className="button"
              variant={
                formData.contribution === "50,000-1,00,000"
                  ? "contained"
                  : "outlined"
              }
              onClick={() =>
                handleButtonClick("contribution", "50,000-1,00,000")
              }
            >
              50,000-1,00,000
            </Button>
            <Button
              className="button"
              variant={
                formData.contribution === "1,00,000-5,00,000"
                  ? "contained"
                  : "outlined"
              }
              onClick={() =>
                handleButtonClick("contribution", "1,00,000-5,00,000")
              }
            >
              1,00,000-5,00,000
            </Button>
            <Button
              className="button"
              variant={
                formData.contribution === "5,00,000 and above"
                  ? "contained"
                  : "outlined"
              }
              onClick={() =>
                handleButtonClick("contribution", "5,00,000 and above")
              }
            >
              5,00,000 and above
            </Button>
          </div>
        </FormControl>

        <FormControl component="fieldset">
          <label>Do you have any investments?</label>
          <div className="button-group">
            <Button
              className="button"
              variant={
                formData.investments === "Yes" ? "contained" : "outlined"
              }
              onClick={() => handleButtonClick("investments", "Yes")}
            >
              Yes
            </Button>
            <Button
              className="button"
              variant={formData.investments === "No" ? "contained" : "outlined"}
              onClick={() => handleButtonClick("investments", "No")}
            >
              No
            </Button>
          </div>
        </FormControl>

        <label>
          What is your risk tolerance?
          <input
            type="text"
            name="riskTolerance"
            value={formData.riskTolerance}
            onChange={handleInputChange}
            placeholder="High, Medium, Low"
          />
        </label>

        <label>
          What is your level of experience with investments?
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            placeholder="Beginner, Intermediate, Expert"
          />
        </label>

        <FormControl component="fieldset">
          <label>Do you have any debts or liabilities?</label>
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
          How much current debts do you have?
          <input
            type="text"
            name="currentDebts"
            value={formData.currentDebts}
            onChange={handleInputChange}
            placeholder="Current Debts"
          />
        </label>

        <label>
          How much outstanding debts do you have?
          <input
            type="text"
            name="outstandingDebts"
            value={formData.outstandingDebts}
            onChange={handleInputChange}
            placeholder="Outstanding Debts"
          />
        </label>

        <label>
          Total amount of outstanding debts?
          <input
            type="text"
            name="totalOutstandingDebts"
            value={formData.totalOutstandingDebts}
            onChange={handleInputChange}
            placeholder="Total Outstanding Debts"
          />
        </label>

        <FormControl component="fieldset">
          <label>Do you have any insurance policies?</label>
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
          What is the coverage amount of your insurance policies?
          <input
            type="text"
            name="insuranceCoverage"
            value={formData.insuranceCoverage}
            onChange={handleInputChange}
            placeholder="Insurance Coverage"
          />
        </label>

        <label>
          What types of insurance policies do you have?
          <input
            type="text"
            name="insurancePolicies"
            value={formData.insurancePolicies}
            onChange={handleInputChange}
            placeholder="Life, Health, Vehicle, etc."
          />
        </label>

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
}
