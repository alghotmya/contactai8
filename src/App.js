// Location: src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import SignOut from './components/SignOut'; // Import the SignOut component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signout" element={<SignOut />} /> {/* Add this route */}
      </Routes>
    </Router>
  );
}

export default App;
