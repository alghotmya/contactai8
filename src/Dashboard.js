// Location: src/Dashboard.js
// Dashboard Component

import React from 'react';
import WorkspaceDropdown from './components/WorkspaceDropdown';
import SidebarMenu from './components/SidebarMenu';
import MainContent from './components/MainContent';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <header>
        <WorkspaceDropdown />
        <div className="profile-section">
          {/* Profile icon and welcome message */}
        </div>
      </header>
      <div className="dashboard-content">
        <SidebarMenu />
        <MainContent />
      </div>
    </div>
  );
};

export default Dashboard;
