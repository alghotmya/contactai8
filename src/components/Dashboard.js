// Location: src/components/Dashboard.js

import React from 'react';
import SidebarMenu from './SidebarMenu';
import '../styles/Dashboard.css'; // Corrected import path

const Dashboard = () => {
  return (
    <div className="dashboard">
      <SidebarMenu />
      <div className="dashboard-content">
        <header>
          <div className="workspace-dropdown">
            <select>
              <option value="workspace1">Workspace 1</option>
              <option value="workspace2">Workspace 2</option>
            </select>
          </div>
          <div className="user-profile">
            <div className="profile-info">
              Welcome, [User's Name]
              <div className="profile-dropdown">
                <button className="dropdown-button">Account</button>
                <div className="dropdown-content">
                  <a href="/profile">Profile</a>
                  <a href="/settings">Settings</a>
                  <a href="/signout">Sign Out</a>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main>
          <h1>Welcome to your Dashboard</h1>
          <p>Here you can manage agents, view reports, and access support documentation.</p>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
