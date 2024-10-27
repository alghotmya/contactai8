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
  const [messages] = useState([]);
  const [errorMessage] = useState("");

  // Handler to add a newly created assistant to the list
  const handleAssistantCreated = (assistantConfig) => {
    setAssistants([...assistants, assistantConfig]);
  };

  // Handler to set the selected assistant for managing calls
  const handleSelectAssistant = (assistant) => {
    setSelectedAssistant(assistant);
  };

  // Handler to indicate that a call has started
  const handleCallStarted = () => {
    setIsCallActive(true);
  };

  // Handler to indicate that a call has ended
  const handleCallEnded = () => {
    setIsCallActive(false);
  };

  return (
    <div className="dashboard">
      {/* Sidebar menu component */}
      <div className="sidebar-menu">
        <SidebarMenu />
      </div>

      {/* Main dashboard content */}
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
          {/* Display error messages if any */}
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

          {/* Chat window showing messages from the assistant and user */}
          <div className="chat-window">
            {messages.map((message, index) => (
              <div key={index} className={`chat-message ${message.sender}`}>
                {message.text}
              </div>
            ))}
          </div>

          {/* Assistant creation form */}
          <h3>Create a New Assistant</h3>
          <AssistantForm onAssistantCreated={handleAssistantCreated} />

          {/* List of created assistants */}
          <h3>Assistant List</h3>
          <AssistantList assistants={assistants} onSelectAssistant={handleSelectAssistant} />

          {/* Display call controls and active call details for the selected assistant */}
          {selectedAssistant && (
            <div className="call-controls-section">
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
