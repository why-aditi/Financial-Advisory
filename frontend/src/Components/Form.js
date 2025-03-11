import React from "react";
import { Button, FormControl } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import api from "../services/api";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import "./Form.css";

const initialValues = {
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
};

const validationRules = {
  age: { required: true, min: 18 },
  maritalStatus: { required: true },
  dependents: { required: true },
  employmentStatus: { required: true },
  annualIncome: { required: true },
  financialGoals: { required: true },
  savings: { required: true },
  investments: { required: true },
  riskTolerance: { required: true },
};

export default function Form() {
  const navigate = useNavigate();
  const {
    values,
    errors,
    isSubmitting,
    submitError,
    handleChange,
    handleSubmit,
    validate,
    setValues
  } = useForm(initialValues, async (formData) => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      throw new Error("No user email found. Please sign up again.");
    }
    
    const response = await api.submitForm({ email, ...formData });
    navigate(`/dashboard/${email}`);
  });

  const handleButtonClick = (field, value) => {
    setValues({ ...values, [field]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validate(validationRules)) {
      await handleSubmit(e);
    }
  };

  if (isSubmitting) {
    return <LoadingSpinner size="large" />;
  }

  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        <h1>Financial Form</h1>
        
        {submitError && (
          <ErrorMessage 
            message={submitError} 
            onRetry={() => setValues(initialValues)} 
          />
        )}

        <label>
          What is your age?
          <input
            type="number"
            name="age"
            value={values.age}
            onChange={handleChange}
            placeholder="Age"
          />
          {errors.age && <span className="error">{errors.age}</span>}
        </label>

        <FormControl component="fieldset">
          <label>What is your marital status?</label>
          <div className="button-group">
            <Button
              className="button"
              variant={values.maritalStatus === "Married" ? "contained" : "outlined"}
              onClick={() => handleButtonClick("maritalStatus", "Married")}
            >
              Married
            </Button>
            <Button
              className="button"
              variant={values.maritalStatus === "Unmarried" ? "contained" : "outlined"}
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
              variant={values.dependents === "Yes" ? "contained" : "outlined"}
              onClick={() => handleButtonClick("dependents", "Yes")}
            >
              Yes
            </Button>
            <Button
              className="button"
              variant={values.dependents === "No" ? "contained" : "outlined"}
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
              variant={values.employmentStatus === "Employed" ? "contained" : "outlined"}
              onClick={() => handleButtonClick("employmentStatus", "Employed")}
            >
              Employed
            </Button>
            <Button
              className="button"
              variant={values.employmentStatus === "Self-Employed" ? "contained" : "outlined"}
              onClick={() => handleButtonClick("employmentStatus", "Self-Employed")}
            >
              Self-Employed
            </Button>
            <Button
              className="button"
              variant={values.employmentStatus === "Unemployed" ? "contained" : "outlined"}
              onClick={() => handleButtonClick("employmentStatus", "Unemployed")}
            >
              Unemployed
            </Button>
            <Button
              className="button"
              variant={values.employmentStatus === "Retired" ? "contained" : "outlined"}
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
            value={values.annualIncome}
            onChange={handleChange}
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
            value={values.extraIncome}
            onChange={handleChange}
            placeholder="Extra Source of Income"
          />
        </label>

        <label>
          Financial Goals
          <input
            type="text"
            name="financialGoals"
            value={values.financialGoals}
            onChange={handleChange}
            placeholder="Financial Goals"
          />
        </label>

        <label>
          Short-term Goals
          <input
            type="text"
            name="shortTermGoals"
            value={values.shortTermGoals}
            onChange={handleChange}
            placeholder="Short-term Goals"
          />
        </label>

        <label>
          What is your Financial Goal for next 1-5 years?
          <input
            type="text"
            name="financialGoal"
            value={values.financialGoal}
            onChange={handleChange}
            placeholder="Buying a house, start a business, etc."
          />
        </label>

        <FormControl component="fieldset">
          <label>How much do you currently have in savings?</label>
          <div className="button-group">
            <Button
              className="button"
              variant={values.savings === "0-1,00,000" ? "contained" : "outlined"}
              onClick={() => handleButtonClick("savings", "0-1,00,000")}
            >
              0-1,00,000
            </Button>
            <Button
              className="button"
              variant={values.savings === "1,00,000-10,00,000" ? "contained" : "outlined"}
              onClick={() => handleButtonClick("savings", "1,00,000-10,00,000")}
            >
              1,00,000-10,00,000
            </Button>
            <Button
              className="button"
              variant={values.savings === "10,00,000-25,00,000" ? "contained" : "outlined"}
              onClick={() => handleButtonClick("savings", "10,00,000-25,00,000")}
            >
              10,00,000-25,00,000
            </Button>
            <Button
              className="button"
              variant={values.savings === "25,00,000-50,00,000" ? "contained" : "outlined"}
              onClick={() => handleButtonClick("savings", "25,00,000-50,00,000")}
            >
              25,00,000-50,00,000
            </Button>
            <Button
              className="button"
              variant={values.savings === "50,00,000+" ? "contained" : "outlined"}
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
              variant={values.contribution === "Below 5,000" ? "contained" : "outlined"}
              onClick={() => handleButtonClick("contribution", "Below 5,000")}
            >
              Below 5,000
            </Button>
            <Button
              className="button"
              variant={values.contribution === "5,000-10,000" ? "contained" : "outlined"}
              onClick={() => handleButtonClick("contribution", "5,000-10,000")}
            >
              5,000-10,000
            </Button>
            <Button
              className="button"
              variant={values.contribution === "10,000-25,000" ? "contained" : "outlined"}
              onClick={() => handleButtonClick("contribution", "10,000-25,000")}
            >
              10,000-25,000
            </Button>
            <Button
              className="button"
              variant={values.contribution === "25,000-50,000" ? "contained" : "outlined"}
              onClick={() => handleButtonClick("contribution", "25,000-50,000")}
            >
              25,000-50,000
            </Button>
            <Button
              className="button"
              variant={values.contribution === "Above 50,000" ? "contained" : "outlined"}
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
            value={values.investments}
            onChange={handleChange}
            placeholder="Investments"
          />
        </label>

        <FormControl component="fieldset">
          <label>What is your risk tolerance?</label>
          <div className="button-group">
            <Button
              className="button"
              variant={values.riskTolerance === "Conservative" ? "contained" : "outlined"}
              onClick={() => handleButtonClick("riskTolerance", "Conservative")}
            >
              Conservative
            </Button>
            <Button
              className="button"
              variant={values.riskTolerance === "Moderate" ? "contained" : "outlined"}
              onClick={() => handleButtonClick("riskTolerance", "Moderate")}
            >
              Moderate
            </Button>
            <Button
              className="button"
              variant={values.riskTolerance === "Aggressive" ? "contained" : "outlined"}
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
              variant={values.experience === "None" ? "contained" : "outlined"}
              onClick={() => handleButtonClick("experience", "None")}
            >
              None
            </Button>
            <Button
              className="button"
              variant={values.experience === "Basic" ? "contained" : "outlined"}
              onClick={() => handleButtonClick("experience", "Basic")}
            >
              Basic
            </Button>
            <Button
              className="button"
              variant={values.experience === "Intermediate" ? "contained" : "outlined"}
              onClick={() => handleButtonClick("experience", "Intermediate")}
            >
              Intermediate
            </Button>
            <Button
              className="button"
              variant={values.experience === "Advanced" ? "contained" : "outlined"}
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
              variant={values.debtLiabilities === "Yes" ? "contained" : "outlined"}
              onClick={() => handleButtonClick("debtLiabilities", "Yes")}
            >
              Yes
            </Button>
            <Button
              className="button"
              variant={values.debtLiabilities === "No" ? "contained" : "outlined"}
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
            value={values.currentDebts}
            onChange={handleChange}
            placeholder="Current Debts"
          />
        </label>

        <label>
          What is your total outstanding debts amount?
          <input
            type="text"
            name="outstandingDebts"
            value={values.outstandingDebts}
            onChange={handleChange}
            placeholder="Outstanding Debts Amount"
          />
        </label>

        <label>
          What is your total outstanding debts amount?
          <input
            type="text"
            name="totalOutstandingDebts"
            value={values.totalOutstandingDebts}
            onChange={handleChange}
            placeholder="Total Outstanding Debts"
          />
        </label>

        <FormControl component="fieldset">
          <label>Do you have any insurance?</label>
          <div className="button-group">
            <Button
              className="button"
              variant={values.insurance === "Yes" ? "contained" : "outlined"}
              onClick={() => handleButtonClick("insurance", "Yes")}
            >
              Yes
            </Button>
            <Button
              className="button"
              variant={values.insurance === "No" ? "contained" : "outlined"}
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
            value={values.insuranceCoverage}
            onChange={handleChange}
            placeholder="Insurance Coverage"
          />
        </label>

        <label>
          How many insurance policies do you have?
          <input
            type="text"
            name="insurancePolicies"
            value={values.insurancePolicies}
            onChange={handleChange}
            placeholder="Number of Policies"
          />
        </label>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          className="submit-button"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}
