import { useState } from 'react';

const useForm = (initialValues = {}, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validate = (validationRules) => {
    const newErrors = {};
    Object.keys(validationRules).forEach(key => {
      if (validationRules[key].required && !values[key]) {
        newErrors[key] = 'This field is required';
      }
      if (validationRules[key].email && values[key] && !/\S+@\S+\.\S+/.test(values[key])) {
        newErrors[key] = 'Please enter a valid email address';
      }
      if (validationRules[key].min && values[key] && values[key].length < validationRules[key].min) {
        newErrors[key] = `Must be at least ${validationRules[key].min} characters`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      await onSubmit(values);
      setValues(initialValues);
    } catch (error) {
      setSubmitError(error.message || 'An error occurred while submitting the form');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    isSubmitting,
    submitError,
    handleChange,
    handleSubmit,
    validate,
    setValues,
    setErrors
  };
};

export default useForm; 