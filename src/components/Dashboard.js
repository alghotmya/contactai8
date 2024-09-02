import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css'; 

function Dashboard() {
  const [workspaces, setWorkspaces] = useState([]);
  const [currentWorkspace, setCurrentWorkspace] = useState('');
  const [profileOptions, setProfileOptions] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [newWorkspaceDescription, setNewWorkspaceDescription] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

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

        const workspaceItems = response.data || []; // Handle response to ensure workspaces are properly extracted
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

  const handleAddWorkspace = async () => {
    const token = localStorage.getItem('id_token');
    
    if (newWorkspaceName && newWorkspaceDescription) {
      try {
        const response = await axios.post('https://dqjq6f5kaa.execute-api.ca-central-1.amazonaws.com/prod/workspaces', 
        { 
          workspaceName: newWorkspaceName, 
          workspaceDescription: newWorkspaceDescription 
        }, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setWorkspaces([...workspaces, response.data]); // Update the workspace list
        setCurrentWorkspace(response.data.WorkspaceName); // Set the new workspace as the current one
        setShowCreateWorkspaceModal(false); // Close the modal
      } catch (error) {
        console.error('Error adding workspace:', error);
      }
    }
  };

  const handleTestAgent = async () => {
    const token = localStorage.getItem('id_token');
    
    try {
      const response = await axios.post('https://your-twilio-api-endpoint', 
      { 
        phoneNumber: phoneNumber
      }, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      alert('Call initiated successfully');
    } catch (error) {
      console.error('Error calling Twilio API:', error);
      alert('Error initiating call');
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
            <button className="button-primary" onClick={() => setShowCreateWorkspaceModal(true)}>Add Workspace</button>
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
                  <a onClick={handleSignOut}>Sign Out</a>
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
        </main>

        {/* Modal for Creating Workspace */}
        {showCreateWorkspaceModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Create New Workspace</h2>
              <input 
                type="text" 
                placeholder="Workspace Name" 
                value={newWorkspaceName}
                onChange={(e) => setNewWorkspaceName(e.target.value)}
              />
              <input 
                type="text" 
                placeholder="Workspace Description" 
                value={newWorkspaceDescription}
                onChange={(e) => setNewWorkspaceDescription(e.target.value)}
              />
              <button className="button-primary" onClick={handleAddWorkspace}>Create Workspace</button>
              <button className="button-secondary" onClick={() => setShowCreateWorkspaceModal(false)}>Cancel</button>
            </div>
          </div>
        )}

        {/* Test Agent Box */}
        <div className="test-agent-box">
          <h3>Test Agent</h3>
          <input 
            type="text" 
            placeholder="Enter phone number" 
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button className="button-primary" onClick={handleTestAgent}>Call</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
