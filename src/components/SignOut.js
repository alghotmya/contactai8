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
          onClick={() => window.location.href = 'https://contactai.auth.ca-central-1.amazoncognito.com/login?client_id=YOUR_CLIENT_ID&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https%3A%2F%2Fmain.d2tf8n90uf18rf.amplifyapp.com%2Fdashboard%2F'}
        >
          Sign In Again
        </button>
      </div>
    </div>
  );
};

export default SignOut;
