import React, { useState, useEffect, useRef } from "react";
import Vapi from "@vapi-ai/web";

const CallControls = ({ assistant, onCallStarted, onCallEnded }) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const vapiInstanceRef = useRef(null); // Use a ref to store the Vapi instance

  // Initialize the Vapi instance once
  useEffect(() => {
    vapiInstanceRef.current = new Vapi(process.env.REACT_APP_VAPI_PUBLIC_KEY);

    // Event listeners for logging
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
        console.error("Detailed error response:", JSON.stringify(e.response, null, 2));
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

    // Minimal assistant configuration for testing
    const minimalAssistantConfig = {
      name: assistant.name,
      firstMessage: assistant.firstMessage || "Hello!",
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      model: {
        provider: "openai",
        model: "gpt-4-turbo",
        fallbackModels: ["gpt-4-turbo"],
        messages: [
          {
            role: "system",
            content: "You are a friendly customer support assistant that retains context and remembers user interactions for seamless support."
          }
        ],
      },
    };

    // Log the minimal payload for debugging
    console.log("Starting call with minimal assistant configuration:", JSON.stringify(minimalAssistantConfig, null, 2));

    vapiInstanceRef.current
      .start(minimalAssistantConfig)
      .then(() => {
        console.log("Call started with assistant:", assistant.name);
      })
      .catch((error) => {
        console.error("Error starting call with assistant:", assistant.name, error);
        if (error.response) {
          console.error("Detailed error response:", JSON.stringify(error.response, null, 2));
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
