import React, { useState } from 'react';
import axios from 'axios'; // For making API calls
import Header from './Header'; // Import the Header component
import SidebarMenu from './SidebarMenu'; // Assuming you also have a SidebarMenu component
import '../styles/Dashboard.css'; // Import CSS

const Dashboard = () => {
  // State for managing user input, chat messages, and error states
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  // Function to handle Bedrock agent testing
  const handleAgentTest = async () => {
    try {
      // Call the Bedrock agent via API Gateway
      const response = await axios.post('https://dqjq6f5kaa.execute-api.ca-central-1.amazonaws.com/prod/invoke-agent', {
        modelId: 'E4UXSHY5Y7',               // Replace with actual model ID
        knowledgeBaseId: 'SY0DQHPVRD', // Replace with actual knowledge base ID
        prompt: inputValue                      // User's input text
      });

      // Append user input and agent response to the chat window
      setMessages([...messages, 
        { sender: 'user', text: inputValue }, 
        { sender: 'agent', text: response.data.message }
      ]);
      setInputValue(''); // Clear input box after submission
    } catch (error) {
      console.error('Error invoking agent:', error);
      setErrorMessage('Error invoking agent');
      // Append the error message to the chat window
      setMessages([...messages, 
        { sender: 'user', text: inputValue }, 
        { sender: 'agent', text: 'Error invoking agent' }
      ]);
      setInputValue(''); // Clear input box after error
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
          <h1>Contact AI Dashboard</h1>
          <div className="workspace-dropdown">
            <label htmlFor="workspace-select">Select Workspace:</label>
            <select id="workspace-select">
              <option value="workspace1">Workspace 1</option>
              <option value="workspace2">Workspace 2</option>
            </select>
          </div>
        </header>

        <main>
          <h3>Test Bedrock Agent</h3>
          <div className="test-agent-box">
            <input 
              type="text" 
              placeholder="Enter your input" 
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)} 
            />
            <button className="button-primary" onClick={handleAgentTest}>Invoke Agent</button>
          </div>

          {/* Display error message */}
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

          {/* Chat window to display messages */}
          <div className="chat-window">
            {messages.map((message, index) => (
              <div key={index} className={`chat-message ${message.sender}`}>
                {message.text}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
