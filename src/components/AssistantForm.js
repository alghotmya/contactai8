import React, { useState, useEffect } from "react";
import axios from "axios";
import Vapi from "@vapi-ai/web";

const AssistantForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assistantConfig, setAssistantConfig] = useState(null);

  // Mary's assistant ID
  const MARY_ASSISTANT_ID = "6be70999-50ec-4d33-a028-64e2887a871c";

  useEffect(() => {
    const fetchAssistantConfig = async () => {
      try {
        const response = await axios.get(
          `https://api.vapi.ai/assistant/${MARY_ASSISTANT_ID}`,
          {
            headers: {
              'Authorization': `Bearer ${process.env.REACT_APP_VAPI_PRIVATE_KEY}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        console.log('Fetched assistant configuration:', response.data);
        setAssistantConfig(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching assistant:', err);
        setError('Failed to fetch assistant configuration: ' + 
          (err.response?.data?.error || err.message));
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssistantConfig();
  }, []);

  const handleStartCall = async () => {
    if (!assistantConfig) {
      setError('Assistant configuration not loaded');
      return;
    }

    try {
      const vapi = new Vapi(process.env.REACT_APP_VAPI_PUBLIC_KEY);
      await vapi.start({
        assistantId: MARY_ASSISTANT_ID
      });
      console.log('Call started with Mary assistant');
    } catch (err) {
      console.error('Error starting call:', err);
      setError('Failed to start call: ' + err.message);
    }
  };

  if (isLoading) {
    return <div>Loading assistant configuration...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="assistant-config">
      <h2>Assistant Configuration</h2>
      {assistantConfig && (
        <>
          <div className="config-item">
            <strong>Name:</strong> {assistantConfig.name || 'Mary'}
          </div>
          <div className="config-item">
            <strong>First Message:</strong> {assistantConfig.firstMessage}
          </div>
          <div className="config-item">
            <strong>Voice Provider:</strong> {assistantConfig.voice?.provider}
          </div>
          <div className="config-item">
            <strong>Model:</strong> {assistantConfig.model?.model}
          </div>
          
          <button 
            onClick={handleStartCall}
            className="start-call-btn"
          >
            Start Call with Mary
          </button>
        </>
      )}
    </div>
  );
};

export default AssistantForm;