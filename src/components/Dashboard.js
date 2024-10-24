// Location: src/components/Dashboard.js
import React, { useState } from 'react';
import axios from 'axios'; // For making API calls
import Header from './Header'; // Import the Header component if needed
import SidebarMenu from './SidebarMenu'; // Import SidebarMenu component if needed
import ActiveCall from './ActiveCall';
import AssistantForm from './AssistantForm';
import AssistantList from './AssistantList';
import CallControls from './CallControls';
import '../styles/Dashboard.css'; // Import CSS

const Dashboard = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [assistants, setAssistants] = useState([]);
  const [selectedAssistant, setSelectedAssistant] = useState(null);
  const [isCallActive, setIsCallActive] = useState(false);

  const handleAgentTest = async () => {
    try {
      const response = await axios.post('https://dqjq6f5kaa.execute-api.ca-central-1.amazonaws.com/prod/invoke-agent', {
        modelId: 'E4UXSHY5Y7',
        knowledgeBaseId: 'SY0DQHPVRD',
        prompt: inputValue,
      });

      setMessages([...messages, { sender: 'user', text: inputValue }, { sender: 'agent', text: response.data.message }]);
      setInputValue('');
    } catch (error) {
      console.error('Error invoking agent:', error);
      setErrorMessage('Error invoking agent');
      setMessages([...messages, { sender: 'user', text: inputValue }, { sender: 'agent', text: 'Error invoking agent' }]);
      setInputValue('');
    }
  };

  const handleAssistantCreated = (assistantConfig) => {
    setAssistants([...assistants, assistantConfig]);
  };

  const handleSelectAssistant = (assistant) => {
    setSelectedAssistant(assistant);
  };

  const handleCallStarted = () => {
    setIsCallActive(true);
  };

  const handleCallEnded = () => {
    setIsCallActive(false);
  };

  return (
    <div className="dashboard">
      <div className="sidebar-menu">
        <SidebarMenu /> {/* Sidebar menu is displayed here */}
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

          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

          <div className="chat-window">
            {messages.map((message, index) => (
              <div key={index} className={`chat-message ${message.sender}`}>
                {message.text}
              </div>
            ))}
          </div>

          <h3>Create and Manage Assistants</h3>
          <AssistantForm onAssistantCreated={handleAssistantCreated} />
          <AssistantList assistants={assistants} onSelectAssistant={handleSelectAssistant} />
          
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
