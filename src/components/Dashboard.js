import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css'; 

function Dashboard() {
  const [workspaces, setWorkspaces] = useState([]);
  const [currentWorkspace, setCurrentWorkspace] = useState('');
  const [profileOptions, setProfileOptions] = useState(false);
  const [responseMessage, setResponseMessage] = useState(''); // Message for Bedrock Agent response
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [newWorkspaceDescription, setNewWorkspaceDescription] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [testInput, setTestInput] = useState(''); // Input for Bedrock Agent testing
  const [knowledgeBaseFile, setKnowledgeBaseFile] = useState(null); // File for Knowledge Base upload
  const [uploadMessage, setUploadMessage] = useState(''); // Message for Knowledge Base sync

  // Fetch workspaces on component mount
  useEffect(() => {
    async function fetchWorkspaces() {
      const token = localStorage.getItem('id_token'); // Assuming you store the id_token in localStorage after login
      try {
        const response = await axios.get('https://dqjq6f5kaa.execute-api.ca-central-1.amazonaws.com/prod/workspaces', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const workspaceItems = response.data.Items || [];
        setWorkspaces(workspaceItems);
        setCurrentWorkspace(workspaceItems[0]?.WorkspaceName || ''); // Set default workspace
      } catch (error) {
        console.error('Error fetching workspaces:', error);
      }
    }
    fetchWorkspaces();
  }, []);

  // Handle workspace selection change
  const handleWorkspaceChange = (event) => {
    setCurrentWorkspace(event.target.value);
  };

  // Toggle profile options dropdown
  const toggleProfileOptions = () => {
    setProfileOptions(!profileOptions);
  };

  // Test Bedrock agent with the input
  const handleInvokeAgent = async () => {
    try {
      const response = await axios.post('https://dqjq6f5kaa.execute-api.ca-central-1.amazonaws.com/prod/invoke-agent', {
        input: testInput,
        agentId: 'E4UXSHY5Y7', // Replace with your Bedrock agent ID
      });
      setResponseMessage(response.data.message || 'Success invoking Bedrock agent');
    } catch (error) {
      console.error('Error invoking Bedrock agent:', error);
      setResponseMessage('Error invoking Bedrock agent');
    }
  };

  // Handle Knowledge Base file selection
  const handleFileChange = (event) => {
    setKnowledgeBaseFile(event.target.files[0]);
  };

  // Sync Knowledge Base with the selected file
  const handleSyncKnowledgeBase = async () => {
    if (!knowledgeBaseFile) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', knowledgeBaseFile);

    try {
      const response = await axios.post('https://dqjq6f5kaa.execute-api.ca-central-1.amazonaws.com/prod/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadMessage('Knowledge base synced successfully');
    } catch (error) {
      console.error('Error syncing knowledge base:', error);
      setUploadMessage('Error syncing knowledge base');
    }
  };

  // Render the Dashboard component
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
            <span>Welcome, [UserName]</span> {/* Replace [UserName] with actual user name */}
            <div className="profile-info">
              <button className="dropdown-button" onClick={toggleProfileOptions}>
                Profile
              </button>
              {profileOptions && (
                <div className="dropdown-content">
                  <a href="/account-details">Account Details</a>
                  <a href="/reset-password">Reset Password</a>
                  <a href="/billing">Billing</a>
                  <a href="#" onClick={() => window.location.href = 'https://main.d2tf8n90uf18rf.amplifyapp.com/signout'}>Sign Out</a>
                </div>
              )}
            </div>
          </div>
        </header>

        <main>
          <h1>Welcome to your Dashboard</h1>
          <p>Current Workspace: {currentWorkspace}</p>

          {/* Test Bedrock Agent Section */}
          <div className="test-agent-box">
            <h3>Test Bedrock Agent</h3>
            <input
              type="text"
              placeholder="Enter your input"
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
            />
            <button className="button-primary" onClick={handleInvokeAgent}>
              Invoke Agent
            </button>
            {responseMessage && <p>{responseMessage}</p>}
          </div>

          {/* Upload Knowledge Base Section */}
          <div className="upload-section">
            <h3>Upload Knowledge Base</h3>
            <input type="file" onChange={handleFileChange} />
            <button className="button-primary" onClick={handleSyncKnowledgeBase}>
              Sync Knowledge Base
            </button>
            {uploadMessage && <p>{uploadMessage}</p>}
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
              <button className="button-primary" onClick={() => { /* Handle Create Workspace */ }}>
                Create Workspace
              </button>
              <button className="button-secondary" onClick={() => setShowCreateWorkspaceModal(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
