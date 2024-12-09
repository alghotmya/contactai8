import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Vapi from "@vapi-ai/web";

const AssistantForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assistantConfig, setAssistantConfig] = useState(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const vapiInstanceRef = useRef(null);

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

    // Initialize VAPI instance
    try {
      vapiInstanceRef.current = new Vapi(process.env.REACT_APP_VAPI_PUBLIC_KEY);
      
      // Set up event listeners
      vapiInstanceRef.current.on("error", (error) => {
        console.error("VAPI error:", error);
        setError(error.message);
        setIsCallActive(false);
      });

      vapiInstanceRef.current.on("end", () => {
        console.log("Call ended");
        setIsCallActive(false);
      });

    } catch (err) {
      console.error("Error initializing VAPI:", err);
      setError("Failed to initialize VAPI: " + err.message);
    }

    // Cleanup
    return () => {
      if (vapiInstanceRef.current) {
        try {
          if (isCallActive) {
            vapiInstanceRef.current.stop();
          }
          vapiInstanceRef.current.removeAllListeners();
        } catch (err) {
          console.error("Error cleaning up VAPI:", err);
        }
      }
    };
  }, []);

  const handleStartCall = async () => {
    if (!assistantConfig) {
      setError('Assistant configuration not loaded');
      return;
    }

    if (isCallActive) {
      setError('A call is already in progress');
      return;
    }

    try {
      if (!vapiInstanceRef.current) {
        throw new Error("VAPI not initialized");
      }

      setError(null); // Clear any previous errors
      console.log('Starting call with assistant ID:', MARY_ASSISTANT_ID);

      await vapiInstanceRef.current.start({
        assistantId: MARY_ASSISTANT_ID,
        transcriber: {
          provider: "deepgram",
          model: "nova-2",
          language: "en-US"
        },
        model: {
          provider: "openai",
          model: "gpt-4-turbo"
        }
      });

      setIsCallActive(true);
      console.log('Call started successfully');
    } catch (err) {
      console.error('Error starting call:', err);
      setError('Failed to start call: ' + (err.message || "Unknown error"));
      setIsCallActive(false);
    }
  };

  const handleEndCall = async () => {
    if (!isCallActive) return;

    try {
      await vapiInstanceRef.current.stop();
      setIsCallActive(false);
      console.log('Call ended successfully');
    } catch (err) {
      console.error('Error ending call:', err);
      setError('Failed to end call: ' + err.message);
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
          
          <div className="call-controls">
            <button 
              onClick={handleStartCall}
              className="start-call-btn"
              disabled={isCallActive}
            >
              {isCallActive ? 'Call in Progress...' : 'Start Call with Mary'}
            </button>

            {isCallActive && (
              <button 
                onClick={handleEndCall}
                className="end-call-btn"
              >
                End Call
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AssistantForm;