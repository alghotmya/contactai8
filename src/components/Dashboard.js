// Location: src/components/Dashboard.js

import React from 'react';
import SidebarMenu from './SidebarMenu';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <SidebarMenu />
      <div className="dashboard-content">
        <header>
          <div className="workspace-dropdown">
            {/* This will be dynamically populated with available workspaces */}
            <select>
              <option value="workspace1">Workspace 1</option>
              <option value="workspace2">Workspace 2</option>
            </select>
          </div>
          <div className="user-profile">
            {/* Profile Icon and Welcome Message */}
            <span>Welcome, [User's Name]</span>
            {/* Profile management options will be provided later */}
          </div>
        </header>
        <main>
          <h1>Welcome to your Dashboard</h1>
          <p>Here you can manage agents, view reports, and access support documentation.</p>
          {/* Additional dashboard content goes here */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
