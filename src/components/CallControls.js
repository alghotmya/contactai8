import React, { useState, useEffect, useRef } from "react";
import Vapi from "@vapi-ai/web";

const CallControls = ({ assistant, onCallStarted, onCallEnded }) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const vapiInstanceRef = useRef(null); // Store the Vapi instance

  useEffect(() => {
    // Create and initialize the Vapi instance
    vapiInstanceRef.current = new Vapi(process.env.REACT_APP_VAPI_PUBLIC_KEY);

    // Log useful events
    vapiInstanceRef.current.on("volume-level", (volume) => {
      console.log(`Volume Level: ${volume}`);
    });

    vapiInstanceRef.current.on("speech-start", () => {
      console.log("Speech has started.");
    });

    vapiInstanceRef.current.on("speech-end", () => {
      console.log("Speech has ended.");
    });

    vapiInstanceRef.current.on("call-start", () => {
      console.log("Call has started.");
      setIsCallActive(true);
      onCallStarted();
    });

    vapiInstanceRef.current.on("call-end", () => {
      console.log("Call has ended.");
      setIsCallActive(false);
      onCallEnded();
    });

    vapiInstanceRef.current.on("error", (e) => {
      console.error("An error occurred:", e);
      if (e.response) {
        console.error("Detailed error response:", e.response);
      }
    });

    return () => {
      // Cleanup event listeners on unmount
      vapiInstanceRef.current.off("volume-level");
      vapiInstanceRef.current.off("speech-start");
      vapiInstanceRef.current.off("speech-end");
      vapiInstanceRef.current.off("call-start");
      vapiInstanceRef.current.off("call-end");
      vapiInstanceRef.current.off("error");
    };
  }, [onCallStarted, onCallEnded]);

  const handleStartCall = () => {
    if (isCallActive) {
      console.log("A call is already in progress. Please end the current call first.");
      return;
    }

    // Log the assistant configuration before starting the call
    console.log("Starting call with assistant configuration:", JSON.stringify(assistant, null, 2));

    vapiInstanceRef.current
      .start(assistant)
      .then(() => {
        console.log("Call started with assistant:", assistant.name);
      })
      .catch((error) => {
        console.error("Error starting call with assistant:", assistant.name, error);
        if (error.response) {
          console.error("Detailed error response:", error.response);
        }
      });
  };

  const handleEndCall = () => {
    if (!isCallActive) {
      console.log("No active call to end.");
      return;
    }

    try {
      vapiInstanceRef.current.stop();
      console.log("Call ended successfully.");
      setIsCallActive(false);
      onCallEnded();
    } catch (err) {
      console.error("Error stopping the call:", err);
    }
  };

  return (
    <div className="call-controls container">
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
