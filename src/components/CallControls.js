import React, { useState, useEffect, useRef } from "react";
import Vapi from "@vapi-ai/web";

const CallControls = ({ assistant, onCallStarted, onCallEnded }) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const vapiInstanceRef = useRef(null);

  useEffect(() => {
    vapiInstanceRef.current = new Vapi(process.env.REACT_APP_VAPI_PUBLIC_KEY);
  }, []);

  const handleStartCall = () => {
    if (isCallActive) return;

    vapiInstanceRef.current.start(assistant).then(() => {
      setIsCallActive(true);
      onCallStarted();
    });
  };

  const handleEndCall = () => {
    if (!isCallActive) return;

    vapiInstanceRef.current.stop();
    setIsCallActive(false);
    onCallEnded();
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
