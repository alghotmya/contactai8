import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css'; 

function Dashboard() {
  const [workspaces, setWorkspaces] = useState([]);
  const [currentWorkspace, setCurrentWorkspace] = useState('');
  const [profileOptions, setProfileOptions] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    // Fetch workspaces from backend (DynamoDB via API Gateway)
    async function fetchWorkspaces() {
      const token = localStorage.getItem('id_token'); // Assuming you store the id_token in localStorage after login
      try {
        const response = await axios.get('https://dqjq6f5kaa.execute-api.ca-central-1.amazonaws.com/prod/workspaces', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const workspaceItems = response.data.Items || []; // Ensure we handle the DynamoDB structure
        setWorkspaces(workspaceItems);
        setCurrentWorkspace(workspaceItems[0]?.WorkspaceName || ''); // Set the first workspace as default, or empty if none exist
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
      setResponseMessage(JSON.stringify(response.data)); // Display the response in the UI for debugging
    } catch (error) {
      console.error('Error calling the API:', error);
      setResponseMessage('Error calling the API: ' + error.message);
    }
  };

  const handleAddWorkspace = async () => {
    const token = localStorage.getItem('id_token');
    const newWorkspaceName = prompt("Enter the name of the new workspace:");
    const newWorkspaceDescription = prompt("Enter a description for the new workspace:");
    
    if (newWorkspaceName && newWorkspaceDescription) {
      try {
        const response = await axios.post('https://dqjq6f5kaa.execute-api.ca-central-1.amazonaws.com/prod/workspaces', 
        { 
          name: newWorkspaceName, 
          description: newWorkspaceDescription 
        }, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setWorkspaces([...workspaces, response.data]); // Update the workspace list
        setCurrentWorkspace(response.data.name); // Set the new workspace as the current one
      } catch (error) {
        console.error('Error adding workspace:', error);
      }
    }
  };

  const handleSignOut = () => {
    // Redirect to Cognito's sign-out page
    window.location.href = 'https://main.d2tf8n90uf18rf.amplifyapp.com/signout';
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
            <button className="button-primary" onClick={handleAddWorkspace}>Add Workspace</button>
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
                  <a href="#" onClick={handleSignOut}>Sign Out</a>
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
