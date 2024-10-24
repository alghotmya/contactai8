// Location: src/components/Dashboard.js
import React, { useState } from 'react';
import axios from 'axios'; // For making API calls
import Header from './Header'; // Import the Header component if needed
import SidebarMenu from './SidebarMenu'; // Import SidebarMenu if needed
import ActiveCall from './ActiveCall';
import AssistantForm from './AssistantForm';
import AssistantList from './AssistantList';
import CallControls from './CallControls';
import '../styles/Dashboard.css'; // Import CSS

const Dashboard = () => {
  // State for managing user input, chat messages, and error states
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [assistants, setAssistants] = useState([]); // To manage a list of created assistants
  const [selectedAssistant, setSelectedAssistant] = useState(null); // To manage the selected assistant
  const [isCallActive, setIsCallActive] = useState(false); // To manage the state of the call

  // Function to handle Bedrock agent testing
  const handleAgentTest = async () => {
    try {
      // Call the Bedrock agent via API Gateway
      const response = await axios.post('https://dqjq6f5kaa.execute-api.ca-central-1.amazonaws.com/prod/invoke-agent', {
        modelId: 'E4UXSHY5Y7', // Replace with actual model ID
        knowledgeBaseId: 'SY0DQHPVRD', // Replace with actual knowledge base ID
        prompt: inputValue, // User's input text
      });

      // Append user input and agent response to the chat window
      setMessages([
        ...messages,
        { sender: 'user', text: inputValue },
        { sender: 'agent', text: response.data.message },
      ]);
      setInputValue(''); // Clear input box after submission
    } catch (error) {
      console.error('Error invoking agent:', error);
      setErrorMessage('Error invoking agent');
      // Append the error message to the chat window
      setMessages([
        ...messages,
        { sender: 'user', text: inputValue },
        { sender: 'agent', text: 'Error invoking agent' },
      ]);
      setInputValue(''); // Clear input box after error
    }
  };

  // Function to handle creating a new assistant
  const handleAssistantCreated = (assistantConfig) => {
    setAssistants([...assistants, assistantConfig]); // Add new assistant to the list
  };

  // Function to handle selecting an assistant
  const handleSelectAssistant = (assistant) => {
    setSelectedAssistant(assistant); // Set the selected assistant
  };

  // Call started handler
  const handleCallStarted = () => {
    setIsCallActive(true);
  };

  // Call ended handler
  const handleCallEnded = () => {
    setIsCallActive(false);
  };

  return (
    <div className="dashboard">
      <div className="sidebar-menu">
        <SidebarMenu /> {/* Make sure this is being rendered correctly */}
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
            <button className="button-primary" onClick={handleAgentTest}>
              Invoke Agent
            </button>
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

          <h3>Create and Manage Assistants</h3>
          {/* Assistant creation form */}
          <AssistantForm onAssistantCreated={handleAssistantCreated} />

          {/* List of created assistants */}
          <AssistantList assistants={assistants} onSelectAssistant={handleSelectAssistant} />

          {/* Call controls (only show if an assistant is selected) */}
          {selectedAssistant && (
            <div>
              <h3>Call Controls for {selectedAssistant.name}</h3>
              <CallControls
                assistant={selectedAssistant}
                onCallStarted={handleCallStarted}
                onCallEnded={handleCallEnded}
              />
              {isCallActive && <ActiveCall assistant={selectedAssistant} />}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
