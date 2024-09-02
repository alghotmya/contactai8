import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css'; 

function Dashboard() {
  const [workspaces, setWorkspaces] = useState([]);
  const [currentWorkspace, setCurrentWorkspace] = useState('');
  const [profileOptions, setProfileOptions] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    // Fetch workspaces from backend
    async function fetchWorkspaces() {
      const token = localStorage.getItem('id_token'); // Assuming you store the id_token in localStorage after login
      try {
        const response = await axios.get('https://dqjq6f5kaa.execute-api.ca-central-1.amazonaws.com/prod/workspaces', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setWorkspaces(response.data);
        setCurrentWorkspace(response.data[0].name); // Set the first workspace as default
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

  const handleApiCall = async () => {
    try {
      const token = localStorage.getItem('id_token');
      const response = await axios.get('https://dqjq6f5kaa.execute-api.ca-central-1.amazonaws.com/prod/workspaces', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setResponseMessage(JSON.stringify(response.data)); // Display the response in the UI
    } catch (error) {
      console.error('Error calling the API:', error);
      setResponseMessage('Error calling the API: ' + error.message);
    }
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
                <option key={workspace.id} value={workspace.name}>{workspace.name}</option>
              ))}
            </select>
            <button className="button-primary" onClick={() => alert('Add workspace functionality goes here')}>Add Workspace</button>
          </div>

          <div className="user-profile">
            <span>Welcome, {currentWorkspace}</span>
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
            {/* Display agent summary */}
          </div>
          <button onClick={handleApiCall}>Test API Call</button>
          {responseMessage && <p>API Response: {responseMessage}</p>}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
