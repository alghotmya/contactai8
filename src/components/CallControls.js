// Location: src/components/CallControls.js

import React, { useState, useEffect, useRef } from "react";
import Vapi from "@vapi-ai/web";

const CallControls = ({ assistant, onCallStarted, onCallEnded }) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const vapiInstanceRef = useRef(null);

  useEffect(() => {
    vapiInstanceRef.current = new Vapi(process.env.REACT_APP_VAPI_PUBLIC_KEY);

    vapiInstanceRef.current.on('speech-start', () => {
      console.log('Speech has started');
    });

    vapiInstanceRef.current.on('speech-end', () => {
      console.log('Speech has ended');
    });

    vapiInstanceRef.current.on('call-start', () => {
      console.log('Call has started');
      onCallStarted();
    });

    vapiInstanceRef.current.on('call-end', () => {
      console.log('Call has ended');
      setIsCallActive(false);
      onCallEnded();
    });

    vapiInstanceRef.current.on('volume-level', (volume) => {
      console.log(`Assistant volume level: ${volume}`);
    });

    vapiInstanceRef.current.on('message', (message) => {
      console.log('Message received:', message);
    });

    vapiInstanceRef.current.on('error', (e) => {
      console.error('An error occurred:', e);
    });
  }, [onCallStarted, onCallEnded]);

  const handleStartCall = () => {
    if (isCallActive) return;

    vapiInstanceRef.current.start(assistant).then(() => {
      setIsCallActive(true);
      console.log('Call started with assistant:', assistant.name);
    }).catch((error) => {
      console.error('Error starting call:', error);
    });
  };

  const handleEndCall = () => {
    if (!isCallActive) return;

    vapiInstanceRef.current.stop().then(() => {
      console.log('Call ended successfully');
      setIsCallActive(false);
    }).catch((error) => {
      console.error('Error ending call:', error);
    });
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
