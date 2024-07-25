import React, { useState } from "react";
import { Button, FormControl } from "@mui/material";
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

  const handleButtonClick = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="form-container">
      <form>
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
          </div>
        </FormControl>

        <label>
          Do you have any investments?
          <input
            type="text"
            name="investments"
            value={formData.investments}
            onChange={handleInputChange}
            placeholder="Stocks, Bonds, Mutual Funds, etc."
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

        <label>
          How comfortable are you with the idea of losing money in investment
          for short-term?
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            placeholder="Comfort level with short-term losses"
          />
        </label>

        <label>
          Debt and Liabilities
          <input
            type="text"
            name="debtLiabilities"
            value={formData.debtLiabilities}
            onChange={handleInputChange}
            placeholder="Debt and liabilities details"
          />
        </label>

        <label>
          Current Debts?
          <input
            type="text"
            name="currentDebts"
            value={formData.currentDebts}
            onChange={handleInputChange}
            placeholder="Current debts details"
          />
        </label>

        <FormControl component="fieldset">
          <label>
            Do you have any outstanding debts? (student loans, credit card
            debts, etc.)
          </label>
          <div className="button-group">
            <Button
              className="button"
              variant={
                formData.outstandingDebts === "Yes" ? "contained" : "outlined"
              }
              onClick={() => handleButtonClick("outstandingDebts", "Yes")}
            >
              Yes
            </Button>
            <Button
              className="button"
              variant={
                formData.outstandingDebts === "No" ? "contained" : "outlined"
              }
              onClick={() => handleButtonClick("outstandingDebts", "No")}
            >
              No
            </Button>
          </div>
        </FormControl>

        <label>
          What is the total amount of outstanding debts?
          <input
            type="text"
            name="totalOutstandingDebts"
            value={formData.totalOutstandingDebts}
            onChange={handleInputChange}
            placeholder="Total outstanding debts amount"
          />
        </label>

        <label>
          Insurance
          <input
            type="text"
            name="insurance"
            value={formData.insurance}
            onChange={handleInputChange}
            placeholder="Insurance details"
          />
        </label>

        <label>
          Insurance coverage
          <input
            type="text"
            name="insuranceCoverage"
            value={formData.insuranceCoverage}
            onChange={handleInputChange}
            placeholder="Insurance coverage details"
          />
        </label>

        <label>
          Do you have any insurance policies?
          <input
            type="text"
            name="insurancePolicies"
            value={formData.insurancePolicies}
            onChange={handleInputChange}
            placeholder="Insurance policies details"
          />
        </label>
      </form>
    </div>
  );
}
