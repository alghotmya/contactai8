// Location: src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import AuthHandler from './components/AuthHandler';
import SignOut from './components/SignOut';
import CallHistory from './components/CallHistory'; // Import CallHistory component

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<AuthHandler />} />
        <Route path="/main" element={<Dashboard />} /> {/* Main Dashboard */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/call-history" element={<CallHistory />} /> {/* Call History Page */}
      </Routes>
    </Router>
  );
}

export default App;
