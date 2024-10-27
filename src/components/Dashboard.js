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
        <SidebarMenu />
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

          <h3>Assistant List</h3>
          <AssistantForm onAssistantCreated={handleAssistantCreated} />
          <AssistantList assistants={assistants} onSelectAssistant={handleSelectAssistant} />
          
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
