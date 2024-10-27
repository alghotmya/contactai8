// Location: src/components/Dashboard.js
import React, { useState } from 'react';
import SidebarMenu from './SidebarMenu';
import ActiveCall from './ActiveCall';
import AssistantForm from './AssistantForm';
import AssistantList from './AssistantList';
import CallControls from './CallControls';
import '../styles/Dashboard.css';

const Dashboard = () => {
  
  const [assistants, setAssistants] = useState([]);
  const [selectedAssistant, setSelectedAssistant] = useState(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [messages] = useState([]); // Remove setMessages if not needed
  const [errorMessage] = useState(""); // Remove setErrorMessage if not needed

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
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

          <div className="chat-window">
            {messages.map((message, index) => (
              <div key={index} className={`chat-message ${message.sender}`}>
                {message.text}
              </div>
            ))}
          </div>

          <div className="create-manage-assistants">
            <h3>Create and Manage Assistants</h3>
            <form className="assistant-form">
              <label htmlFor="assistant-name">Assistant Name:</label>
              <input id="assistant-name" type="text" placeholder="Enter assistant name" />

              <label htmlFor="welcome-message">Welcome Message:</label>
              <input id="welcome-message" type="text" placeholder="Enter welcome message" />

              <label htmlFor="voice">Voice:</label>
              <select id="voice">
                <option value="andrew">Andrew (azure)</option>
                {/* Add other voice options here */}
              </select>

              <label htmlFor="language">Language:</label>
              <select id="language">
                <option value="en-US">en-US</option>
                {/* Add other language options here */}
              </select>

              <button type="submit">Create Assistant</button>
            </form>

            <div className="saved-assistants">
              <h4>Saved Assistants</h4>
              <ul>
                {assistants.map((assistant, index) => (
                  <li key={index}>
                    <span className="assistant-name">{assistant.name}</span>
                    <button className="delete-button">Delete</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <h3>Assistant List</h3>
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
