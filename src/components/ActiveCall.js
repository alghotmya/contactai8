import React, { useState, useEffect } from "react";
import Vapi from "@vapi-ai/web";  // Use local Vapi instance

const ActiveCall = ({ assistant }) => {
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const vapiInstance = new Vapi(process.env.REACT_APP_VAPI_PUBLIC_KEY);  // Create a new Vapi instance

    // Event listeners for this assistant's call
    const handleVolumeLevel = (volume) => setVolumeLevel(volume);
    const handleSpeechStart = () => setIsSpeaking(true);
    const handleSpeechEnd = () => setIsSpeaking(false);

    vapiInstance.on("volume-level", handleVolumeLevel);
    vapiInstance.on("speech-start", handleSpeechStart);
    vapiInstance.on("speech-end", handleSpeechEnd);

    // Cleanup function
    return () => {
      vapiInstance.off("volume-level", handleVolumeLevel);
      vapiInstance.off("speech-start", handleSpeechStart);
      vapiInstance.off("speech-end", handleSpeechEnd);
    };
  }, [assistant]);  // Re-run the effect when the assistant changes

  return (
    <div>
      <p>Volume Level: {volumeLevel}</p>
      <p>Assistant is speaking: {isSpeaking ? "Yes" : "No"}</p>
    </div>
  );
};

export default ActiveCall;
