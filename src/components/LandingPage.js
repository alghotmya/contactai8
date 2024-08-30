// Location: src/components/LandingPage.js

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import DemoRequestForm from './DemoRequestForm';
import TestingAgentForm from './TestingAgentForm';
import '../styles/LandingPage.css'; // Ensure the correct path to CSS

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
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

        {/* About Section */}
        <section className="about">
          <h2>About ContactAI</h2>
          <p>ContactAI helps you manage phone calls with AI agents, transforming missed calls into opportunities.</p>
        </section>

        {/* Demo Request Form */}
        <section className="demo-request">
          <h2>Request a Demo</h2>
          <DemoRequestForm />
        </section>

        {/* Resources Section */}
        <section className="resources">
          <h2>Resources</h2>
          <ul>
            <li><a href="/tutorials">Tutorials</a></li>
            <li><a href="/documentation">Documentation</a></li>
            <li><a href="/support">Support</a></li>
          </ul>
        </section>

        {/* Testing Agent Form */}
        <section className="testing-agent">
          <h2>Test Our AI Agent</h2>
          <TestingAgentForm />
        </section>

        {/* Statistics and Testimonials */}
        <section className="statistics">
          <h2>What Our Users Say</h2>
          <p>Statistics and testimonials to encourage sign-ups will be displayed here.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
