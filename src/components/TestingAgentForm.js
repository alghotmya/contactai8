// Location: src/components/TestingAgentForm.js

import React, { useState } from 'react';

const TestingAgentForm = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, like sending data to the backend
    console.log('Testing request submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} value={formData.phoneNumber} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} required />
      <button type="submit">Test the AI Agent</button>
    </form>
  );
};

export default TestingAgentForm;
