import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignOut.css'; // Correct path

const SignOut = () => {
  const navigate = useNavigate();

  return (
    <div className="signout-page">
      <h1>You have been signed out</h1>
      <p>Thank you for using ContactAI. We hope to see you again soon!</p>
      <div className="signout-buttons">
        <button onClick={() => navigate('/')}>Home Page</button>
        <button 
          onClick={() => window.location.href = 'https://your_cognito_signup_url'}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignOut;
