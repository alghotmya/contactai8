import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import AuthHandler from './components/AuthHandler';
import SignOut from './components/SignOut'; // Import the SignOut component

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<AuthHandler />} />  {/* Use AuthHandler to process the token */}
        <Route path="/main" element={<Dashboard />} /> {/* Redirect to the actual dashboard */}
        <Route path="/signout" element={<SignOut />} /> {/* Route to handle signout */}
      </Routes>
    </Router>
  );
}

export default App;
