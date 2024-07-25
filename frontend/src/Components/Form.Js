import React from 'react';
import './Form.css';

const Form = () => {
  return (
    <div className="form-container">
      <form>
        <h1></h1>
        <div className='label-group'>
        <label>
          What is your age?
          <input type="number" name="age" placeholder="Age" />
        </label>
        <label>
        What is your marital status?
        <div class="radio-group">
            <input type="radio" name="maritalStatus" value="Married" id="married" class="radio-input" /> married
            <input type="radio" name="maritalStatus" value="Unmarried" id="unmarried" class="radio-input" /> Unmarried
        </div>
    </label>

        </div>
        <label>
          Do you have any dependents?
          <div className="radio-group">
            <br />
            <input type="radio" name="dependents" value="Yes" /> Yes
            <input type="radio" name="dependents" value="No" /> No
          </div>
        </label>
        <label>
          What is your current employment status?
          <div className="radio-group">
            <input type="radio" name="employmentStatus" value="Employed" /> Employed
            <input type="radio" name="employmentStatus" value="Self-Employed" /> Self-Employed
            <input type="radio" name="employmentStatus" value="Unemployed" /> Unemployed
            <input type="radio" name="employmentStatus" value="Retired" /> Retired
          </div>
        </label>
        <label>
          What is your annual income?
          <br />
          <input type="text" name="annualIncome" placeholder="Annual Income" />
        </label>
        <label>
          Do you have any extra source of income?
          <br />
          <input type="text" name="extraIncome" placeholder="Extra Source of Income" />
        </label>
        <label>
          Financial Goals
          <br />
          <input type="text" name="financialGoals" placeholder="Financial Goals" />
        </label>
        <label>
          Short-term Goals
          <br />
          <input type="text" name="shortTermGoals" placeholder="Short-term Goals" />
        </label>
        <label>
          What is your Financial Goal for next 1-5 years?
          <br />
          <input type="text" name="financialGoal" placeholder="Buying a house, start a business, etc." />
        </label>
        <label>
          How much do you currently have in savings?
          <div className="radio-group">
          <br />
            <input type="radio" name="savings" value="0-1,00,000" /> 0-1,00,000
            <input type="radio" name="savings" value="1,00,000-10,00,000" /> 1,00,000-10,00,000
            <input type="radio" name="savings" value="10,00,000-25,00,000" /> 10,00,000-25,00,000
            <input type="radio" name="savings" value="25,00,000-50,00,000" /> 25,00,000-50,00,000
            <br />
            <input type="radio" name="savings" value="50,00,000-1,00,00,000" /> 50,00,000-1,00,00,000
            <input type="radio" name="savings" value="1,00,00,000 and above" /> 1,00,00,000 and above
          </div>
        </label>
        <label>
          How much do you contribute to your savings?
          <div className="radio-group">
          <br />
            <input type="radio" name="contribution" value="0-10,000" /> 0-10,000
            <input type="radio" name="contribution" value="10,000-50,000" /> 10,000-50,000
            <input type="radio" name="contribution" value="50,000-1,00,000" /> 50,000-1,00,000
            <input type="radio" name="contribution" value="1,00,000-5,00,000" /> 1,00,000-5,00,000
          </div>
        </label>
        <label>
          Do you have any investments?
          <br />
          <input type="text" name="investments" placeholder="Stocks, Bonds, Mutual Funds, Real Estate, etc." />
        </label>
        <label>
          How would you describe your risk tolerance?
          <div className="radio-group">
          <br />
            <input type="radio" name="riskTolerance" value="Conservative" /> Conservative
            <input type="radio" name="riskTolerance" value="Moderate" /> Moderate
            <input type="radio" name="riskTolerance" value="Aggressive" /> Aggressive
          </div>
        </label>
        <label>
          How comfortable are you with the idea of losing money in investment for short-term?
          <br />
          <input type="text" name="experience" placeholder="Experience" />
        </label>
        <label>
          Debt and Liabilities
          <br />
          <input type="text" name="debtLiabilities" placeholder="Debt and Liabilities" />
        </label>
        <label>
          Current Debts?
          <br />
          <input type="text" name="currentDebts" placeholder="Current Debts" />
        </label>
        <label>
          Do you have any outstanding debts? (student loans, credit card debts, etc.)
          <div className="radio-group">
          <br />
            <input type="radio" name="outstandingDebts" value="Yes" /> Yes
            <input type="radio" name="outstandingDebts" value="No" /> No
          </div>
        </label>
        <label>
          What is the total amount of outstanding debts?
          <br />
          <input type="text" name="totalOutstandingDebts" placeholder="Total outstanding debts" />
        </label>
        <label>
          Insurance
          <br />
          <input type="text" name="insurance" placeholder="Insurance" />
        </label>
        <label>
          Insurance coverage
          <br />
          <input type="text" name="insuranceCoverage" placeholder="Insurance coverage" />
        </label>
        <label>
          Do you have any insurance policies?
          <br />
          <input type="text" name="insurancePolicies" placeholder="Insurance policies" />
        </label>
      </form>
    </div>
  );
}

export default Form;
