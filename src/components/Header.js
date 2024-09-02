import React from 'react';
import '../styles/Header.css'; // Ensure the correct path to the CSS file

const Header = () => {
  return (
    <header>
      <div className="logo" onClick={() => window.location.href = '/'}>
        ContactAI
      </div>
      <nav>
        <ul>
          <li>
            <a 
              href="https://contactai.auth.ca-central-1.amazoncognito.com/login?client_id=6p6r9ps49qu1ehoom8apsm9jcm&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https%3A%2F%2Fmain.d2tf8n90uf18rf.amplifyapp.com%2Fdashboard%2F" 
              className="auth-link"
            >
              Sign In
            </a>
          </li>
          <li>
            <a 
              href="https://contactai.auth.ca-central-1.amazoncognito.com/signup?client_id=6p6r9ps49qu1ehoom8apsm9jcm&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https%3A%2F%2Fmain.d2tf8n90uf18rf.amplifyapp.com%2Fdashboard%2F" 
              className="auth-link"
            >
              Sign Up
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
