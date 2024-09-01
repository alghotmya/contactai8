import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import AuthHandler from './components/AuthHandler'; // Import the AuthHandler

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<AuthHandler />} />  {/* Use AuthHandler to process the token */}
                <Route path="/dashboard/main" element={<Dashboard />} /> {/* Redirect to the actual dashboard after token storage */}
            </Routes>
        </Router>
    );
}

export default App;
