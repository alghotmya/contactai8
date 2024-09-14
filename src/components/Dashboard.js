import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is installed for API requests

const Dashboard = () => {
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [workspaces, setWorkspaces] = useState([]);
  const [currentWorkspace, setCurrentWorkspace] = useState('');
  const [profileOptions, setProfileOptions] = useState(false);

  // Function to handle API call to Bedrock
  const handleInvokeAgent = async () => {
    setErrorMessage(''); // Reset error message

    try {
      const response = await axios.post('https://dqjq6f5kaa.execute-api.ca-central-1.amazonaws.com/prod/invoke-agent', {
        modelId: 'YourBedrockModelId',  // Replace with actual model ID
        knowledgeBaseId: 'YourKnowledgeBaseId',  // Replace with actual knowledge base ID
        prompt: inputText,  // Send the user input as the prompt
      });

      // Append user input and agent response to chat history
      setChatHistory((prevChat) => [
        ...prevChat,
        { role: 'user', message: inputText },
        { role: 'agent', message: response.data.response }, // Assuming response.data.response contains the agent's reply
      ]);
    } catch (error) {
      console.error('Error invoking Bedrock agent:', error);
      setErrorMessage('Error invoking Bedrock agent');
    }

    // Clear input after sending
    setInputText('');
  };

  // Fetching workspaces (original functionality)
  useEffect(() => {
    async function fetchWorkspaces() {
      const token = localStorage.getItem('id_token'); // Assuming token is stored in localStorage after login
      try {
        const response = await axios.get('https://dqjq6f5kaa.execute-api.ca-central-1.amazonaws.com/prod/workspaces', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const workspaceItems = response.data.Items || []; // Ensure we handle DynamoDB structure
        setWorkspaces(workspaceItems);
        setCurrentWorkspace(workspaceItems[0]?.WorkspaceName || ''); // Set the first workspace as default
      } catch (error) {
        console.error('Error fetching workspaces:', error);
      }
    }
    fetchWorkspaces();
  }, []);

  const handleWorkspaceChange = (event) => {
    setCurrentWorkspace(event.target.value);
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
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
            <span>Welcome, [UserName]</span> {/* Replace [UserName] with actual user name */}
            <div className="profile-info">
              <button className="dropdown-button" onClick={() => setProfileOptions(!profileOptions)}>
                Profile
              </button>
              {profileOptions && (
                <div className="dropdown-content">
                  <a href="/account-details">Account Details</a>
                  <a href="/reset-password">Reset Password</a>
                  <a href="/billing">Billing</a>
                  <a href="#" onClick={() => { localStorage.removeItem('id_token'); window.location.href = '/signout'; }}>Sign Out</a>
                </div>
              )}
            </div>
          </div>
        </header>

        <main>
          <h1>Dashboard</h1>

          {/* Test Bedrock Agent Box */}
          <div className="test-agent-box">
            <h3>Test Bedrock Agent</h3>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter your input"
            />
            <button className="button-primary" onClick={handleInvokeAgent}>Invoke Agent</button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </div>

          {/* Chat window for showing conversation with agent */}
          <div className="chat-window">
            {chatHistory.map((chat, index) => (
              <div key={index} className={`chat-message ${chat.role}`}>
                <p>{chat.message}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
