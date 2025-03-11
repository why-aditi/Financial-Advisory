const { body, validationResult } = require('express-validator');

const validateForm = [
  body('email').isEmail().withMessage('Please enter a valid email address'),
  body('age').optional().isInt({ min: 18 }).withMessage('Age must be at least 18'),
  body('annualIncome').optional().isString().withMessage('Annual income must be a string'),
  body('extraIncome').optional().isString().withMessage('Extra income must be a string'),
  body('savings').optional().isString().withMessage('Savings must be a string'),
  body('contribution').optional().isString().withMessage('Contribution must be a string'),
  body('investments').optional().isString().withMessage('Investments must be a string'),
  body('debtLiabilities').optional().isString().withMessage('Debt liabilities must be a string'),
  body('currentDebts').optional().isString().withMessage('Current debts must be a string'),
  body('outstandingDebts').optional().isString().withMessage('Outstanding debts must be a string'),
  body('totalOutstandingDebts').optional().isString().withMessage('Total outstanding debts must be a string'),
  body('insurance').optional().isString().withMessage('Insurance must be a string'),
  body('insuranceCoverage').optional().isString().withMessage('Insurance coverage must be a string'),
  body('insurancePolicies').optional().isString().withMessage('Insurance policies must be a string'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        status: 'error',
        errors: errors.array().map(err => ({
          field: err.param,
          message: err.msg
        }))
      });
    }
    next();
  }
];

module.exports = validateForm; 