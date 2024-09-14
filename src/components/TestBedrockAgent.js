// File: src/components/TestBedrockAgent.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/TestBedrockAgent.css';

function TestBedrockAgent() {
  const [userInput, setUserInput] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleTestAgent = async () => {
    const token = localStorage.getItem('id_token'); // Assuming you store the id_token in localStorage after login
    try {
      const response = await axios.post(
        'https://dqjq6f5kaa.execute-api.ca-central-1.amazonaws.com/prod/knowledge-base/invoke', // Update the endpoint
        {
          input: userInput, // Pass the user input
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token if needed
          },
        }
      );

      setResponseMessage(response.data.message); // Set the response message
    } catch (error) {
      console.error('Error invoking Bedrock agent:', error);
      setResponseMessage('Error invoking Bedrock agent');
    }
  };

  return (
    <div className="test-bedrock-agent">
      <h3>Test Bedrock Agent</h3>
      <input
        type="text"
        placeholder="Enter your input"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className="agent-input"
      />
      <button className="button-primary" onClick={handleTestAgent}>
        Invoke Agent
      </button>
      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
  );
}

export default TestBedrockAgent;
