import React from 'react';
import Header from './Header';
import Footer from './Footer';
import DemoRequestForm from './DemoRequestForm';
import TestingAgentForm from './TestingAgentForm';
import '../styles/LandingPage.css'; // Ensure the correct path to CSS

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header /> {/* This will now use the updated header with correct links */}
      <main>
        {/* Intro Section */}
        <section className="intro">
          <h1>Welcome to ContactAI</h1>
          <p>Turn missed calls into revenue with AI phone call agents.</p>
          <div className="buttons">
            <button 
              className="auth-button"
              onClick={() => window.location.href = 'https://contactai.auth.ca-central-1.amazoncognito.com/login?client_id=6p6r9ps49qu1ehoom8apsm9jcm&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https%3A%2F%2Fmain.d2tf8n90uf18rf.amplifyapp.com%2Fdashboard%2F'}
            >
              Sign In
            </button>
            <button 
              className="auth-button"
              onClick={() => window.location.href = 'https://contactai.auth.ca-central-1.amazoncognito.com/signup?client_id=6p6r9ps49qu1ehoom8apsm9jcm&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https%3A%2F%2Fmain.d2tf8n90uf18rf.amplifyapp.com%2Fdashboard%2F'}
            >
              Sign Up
            </button>
          </div>
        </section>

        {/* Other sections here ... */}

      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
