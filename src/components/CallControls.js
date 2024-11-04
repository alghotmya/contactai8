import React, { useState, useEffect, useRef } from "react";
import Vapi from "@vapi-ai/web";
import CallModal from "./CallModal"; // Import the CallModal component

const CallControls = ({ assistant, onCallStarted, onCallEnded }) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const vapiInstanceRef = useRef(null);

  useEffect(() => {
    const vapiInstance = new Vapi(process.env.REACT_APP_VAPI_PUBLIC_KEY);
    vapiInstanceRef.current = vapiInstance;

    const handleVolumeLevel = (volume) => setVolumeLevel(volume);
    const handleSpeechStart = () => setIsSpeaking(true);
    const handleSpeechEnd = () => setIsSpeaking(false);

    vapiInstance.on("volume-level", handleVolumeLevel);
    vapiInstance.on("speech-start", handleSpeechStart);
    vapiInstance.on("speech-end", handleSpeechEnd);

    return () => {
      if (handleVolumeLevel) vapiInstance.off("volume-level", handleVolumeLevel);
      if (handleSpeechStart) vapiInstance.off("speech-start", handleSpeechStart);
      if (handleSpeechEnd) vapiInstance.off("speech-end", handleSpeechEnd);
    };
  }, []);

  const handleStartCall = () => {
    if (isCallActive) {
      console.log("A call is already in progress. Please end the current call first.");
      return;
    }

    const minimalAssistantConfig = {
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
            content: assistant?.assistantOverrides?.model?.messages?.[0]?.content || 
                     "Default system prompt."
          }
        ],
      },
    };

    console.log("Starting call with minimal assistant configuration:", JSON.stringify(minimalAssistantConfig, null, 2));

    vapiInstanceRef.current
      .start(minimalAssistantConfig)
      .then(() => {
        console.log("Call started with assistant:", assistant.name);
        setIsCallActive(true);
        setShowModal(true); // Show the modal when the call starts
        if (onCallStarted) onCallStarted(); // Ensure function exists before calling
      })
      .catch((error) => {
        console.error("Error starting call with assistant:", error);
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
      setShowModal(false); // Hide the modal when the call ends
      if (onCallEnded) onCallEnded(); // Ensure function exists before calling
    } catch (err) {
      console.error("Error stopping the call:", err);
    }
  };

  return (
    <div className="call-controls container">
      <button onClick={handleStartCall} disabled={isCallActive}>
        Start Call with {assistant?.name || "the Assistant"}
      </button>
      <button onClick={handleEndCall} disabled={!isCallActive}>
        End Call
      </button>
      <CallModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        volumeLevel={volumeLevel}
        isSpeaking={isSpeaking}
      />
    </div>
  );
};

export default CallControls;
