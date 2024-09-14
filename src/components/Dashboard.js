// File: src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TestBedrockAgent from './TestBedrockAgent'; // Import the new component
import '../styles/Dashboard.css';

function Dashboard() {
  const [workspaces, setWorkspaces] = useState([]);
  const [currentWorkspace, setCurrentWorkspace] = useState('');
  const [profileOptions, setProfileOptions] = useState(false);

  useEffect(() => {
    async function fetchWorkspaces() {
      const token = localStorage.getItem('id_token'); // Assuming you store the id_token in localStorage after login
      try {
        const response = await axios.get(
          'https://dqjq6f5kaa.execute-api.ca-central-1.amazonaws.com/prod/workspaces',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const workspaceItems = response.data.Items || [];
        setWorkspaces(workspaceItems);
        setCurrentWorkspace(workspaceItems[0]?.WorkspaceName || '');
      } catch (error) {
        console.error('Error fetching workspaces:', error);
      }
    }
    fetchWorkspaces();
  }, []);

  const handleWorkspaceChange = (event) => {
    setCurrentWorkspace(event.target.value);
  };

  const toggleProfileOptions = () => {
    setProfileOptions(!profileOptions);
  };

  return (
    <div className="dashboard">
      <div className="sidebar-menu">
        <ul>
          <li><a href="/agent-management">Agent Management</a></li>
          <li><a href="/settings">Settings</a></li>
          <li><a href="/support">Support</a></li>
          <li><a href="/documentation">Documentation/Tutorial</a></li>
          <li><a href="/reporting">Reporting</a></li>
        </ul>
      </div>

      <div className="dashboard-content">
        <header>
          <div className="workspace-dropdown">
            <label htmlFor="workspace-select">Current Workspace:</label>
            <select id="workspace-select" value={currentWorkspace} onChange={handleWorkspaceChange}>
              {workspaces.map((workspace) => (
                <option key={workspace.WorkspaceID} value={workspace.WorkspaceName}>
                  {workspace.WorkspaceName}
                </option>
              ))}
            </select>
          </div>

          <div className="user-profile">
            <span>Welcome, [UserName]</span>
            <div className="profile-info">
              <button className="dropdown-button" onClick={toggleProfileOptions}>
                Profile
              </button>
              {profileOptions && (
                <div className="dropdown-content">
                  <a href="/account-details">Account Details</a>
                  <a href="/reset-password">Reset Password</a>
                  <a href="/billing">Billing</a>
                  <a href="/signout">Sign Out</a>
                </div>
              )}
            </div>
          </div>
        </header>

        <main>
          <h1>Welcome to your Dashboard</h1>
          <p>Current Workspace: {currentWorkspace}</p>
          <div className="agent-summary">
            <h3>Active Agents</h3>
          </div>

          {/* Test Bedrock Agent Component */}
          <div className="right-panel">
            <TestBedrockAgent /> {/* Add the test component here */}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
