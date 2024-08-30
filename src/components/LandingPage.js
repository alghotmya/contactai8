// Location: src/components/LandingPage.js

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import DemoRequestForm from './DemoRequestForm';
import TestingAgentForm from './TestingAgentForm';
import '../styles/LandingPage.css'; // Corrected import path

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
            <button onClick={() => window.location.href = '/signin'}>Sign In</button>
            <button onClick={() => window.location.href = '/signup'}>Sign Up</button>
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
