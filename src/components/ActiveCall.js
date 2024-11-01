// Location: src/components/ActiveCall.js

import React, { useState, useEffect } from "react";
import Vapi from "@vapi-ai/web";
import '../styles/GeneralComponents.css';

const ActiveCall = ({ assistant }) => {
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const vapiInstance = new Vapi(process.env.REACT_APP_VAPI_PUBLIC_KEY);

    const handleVolumeLevel = (volume) => setVolumeLevel(volume);
    const handleSpeechStart = () => setIsSpeaking(true);
    const handleSpeechEnd = () => setIsSpeaking(false);

    vapiInstance.on("volume-level", handleVolumeLevel);
    vapiInstance.on("speech-start", handleSpeechStart);
    vapiInstance.on("speech-end", handleSpeechEnd);

    return () => {
      vapiInstance.off("volume-level", handleVolumeLevel);
      vapiInstance.off("speech-start", handleSpeechStart);
      vapiInstance.off("speech-end", handleSpeechEnd);
    };
  }, [assistant]);

  return (
    <div>
      <p>Volume Level: {volumeLevel}</p>
      <p>Assistant is speaking: {isSpeaking ? "Yes" : "No"}</p>
    </div>
  );
};

export default ActiveCall;
