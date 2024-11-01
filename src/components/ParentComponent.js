import React, { useCallback } from 'react';
import CallControls from './CallControls';

const ParentComponent = () => {
  const handleCallStart = useCallback(() => {
    console.log('Call started in parent component');
  }, []); // useCallback ensures the function reference stays stable

  const handleCallEnd = useCallback(() => {
    console.log('Call ended in parent component');
  }, []); // useCallback ensures the function reference stays stable

  const assistantConfig = {
    name: "Assistant Name",
    // Other configuration properties can go here
  };

  return (
    <div>
      <h1>Assistant Control Panel</h1>
      <CallControls 
        assistant={assistantConfig} 
        onCallStarted={handleCallStart} 
        onCallEnded={handleCallEnd} 
      />
    </div>
  );
};

export default ParentComponent;
