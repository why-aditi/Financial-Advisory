const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'An error occurred');
  }
  return response.json();
};

const api = {
  async submitForm(formData) {
    const response = await fetch(`${API_URL}/forms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    return handleResponse(response);
  },

  async getFormEntries() {
    const response = await fetch(`${API_URL}/forms`);
    return handleResponse(response);
  },

  async getFormEntryByEmail(email) {
    const response = await fetch(`${API_URL}/forms/${email}`);
    return handleResponse(response);
  },
};

export default api; 