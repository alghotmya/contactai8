import React, { useState, useEffect, useRef } from "react";
import Vapi from "@vapi-ai/web";

const CallControls = ({ assistant, onCallStarted, onCallEnded }) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const vapiInstanceRef = useRef(null);  // Use a ref to store the Vapi instance

  // Initialize the Vapi instance once
  useEffect(() => {
    vapiInstanceRef.current = new Vapi(process.env.REACT_APP_VAPI_PUBLIC_KEY);
  }, []);

  // Start Call Handler
  const handleStartCall = () => {
    if (isCallActive) {
      console.log("A call is already in progress. Please end the current call first.");
      return;
    }

    vapiInstanceRef.current.start(assistant)
      .then(() => {
        console.log("Call started with assistant:", assistant.name);
        setIsCallActive(true);
        onCallStarted();
      })
      .catch((err) => {
        console.error("Error starting call with assistant:", assistant.name, err);
      });
  };

  // End Call Handler
  const handleEndCall = () => {
    if (!isCallActive) {
      console.log("No active call to end.");
      return;
    }

    try {
      vapiInstanceRef.current.stop();  // No .then() block since stop() isn't a Promise
      console.log("Call ended successfully.");
      setIsCallActive(false);
      onCallEnded();
    } catch (err) {
      console.error("Error stopping the call:", err);
    }
  };

  // Cleanup if the component unmounts during an active call
  useEffect(() => {
    return () => {
      if (isCallActive) {
        vapiInstanceRef.current.stop();
        setIsCallActive(false);
      }
    };
  }, [isCallActive]);

  return (
    <div>
      <button onClick={handleStartCall} disabled={isCallActive}>
        Start Call with {assistant.name}
      </button>
      <button onClick={handleEndCall} disabled={!isCallActive}>
        End Call
      </button>
    </div>
  );
};

export default CallControls;
