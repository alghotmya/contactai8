import React, { useState } from 'react';
import axios from 'axios'; // Ensure axios is installed for API requests

const Dashboard = () => {
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle the API call to Bedrock
  const handleInvokeAgent = async () => {
    setErrorMessage(''); // Reset the error message

    try {
      const response = await axios.post('https://dqjq6f5kaa.execute-api.ca-central-1.amazonaws.com/prod/invoke-agent', {
        modelId: 'YourBedrockModelId',  // Replace with the actual model ID
        knowledgeBaseId: 'YourKnowledgeBaseId',  // Replace with the actual knowledge base ID
        prompt: inputText,  // Send the user input as the prompt
      });

      // Append the user input and agent response to the chat history
      setChatHistory((prevChat) => [
        ...prevChat,
        { role: 'user', message: inputText },
        { role: 'agent', message: response.data.response }, // This assumes response.data.response contains the agent's reply
      ]);
    } catch (error) {
      console.error('Error invoking Bedrock agent:', error);
      setErrorMessage('Error invoking Bedrock agent');
    }

    // Clear the input after sending
    setInputText('');
  };

  return (
    <div className="dashboard-content">
      <h1>Dashboard</h1>

      <div className="test-agent-box">
        <h3>Test Bedrock Agent</h3>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter your input"
        />
        <button className="button-primary" onClick={handleInvokeAgent}>
          Invoke Agent
        </button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>

      {/* Chat window for showing conversation with the agent */}
      <div className="chat-window">
        {chatHistory.map((chat, index) => (
          <div key={index} className={`chat-message ${chat.role}`}>
            <p>{chat.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
