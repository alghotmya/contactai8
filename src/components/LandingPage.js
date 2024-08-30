// Location: src/components/LandingPage.js
// Landing Page Component

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import DemoRequestForm from './DemoRequestForm';
import TestingAgentForm from './TestingAgentForm';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
      <main>
        <section className="intro">
          <h1>Turn missed calls into revenue with AI phone call agents</h1>
          <p>Automate calls with AI phone agents that take inbound calls...</p>
          <div className="buttons">
            <button onClick={() => window.location.href = '/signin'}>Sign In</button>
            <button onClick={() => window.location.href = '/signup'}>Sign Up</button>
          </div>
        </section>
        <section className="about">
          <h2>About ContactAI</h2>
          <p>ContactAI helps you manage phone calls with AI agents...</p>
        </section>
        <DemoRequestForm />
        <TestingAgentForm />
        <section className="statistics">
          <h2>What our users say</h2>
          {/* Testimonials and statistics go here */}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
