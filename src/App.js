// Location: src/App.js

import React from 'react';
// Import the CSS for the overall App styling
import './App.css';
// Import the LandingPage component from the components directory
import LandingPage from './components/LandingPage';

function App() {
  return (
    <div className="App">
      {/* Rendering the LandingPage component as the main content */}
      <LandingPage />
    </div>
  );
}

export default App;
