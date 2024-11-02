// Location: src/components/CallModal.js

import React from "react";
import "./CallModal.css"; // Create a CSS file for styling the modal

const CallModal = ({ isOpen, onClose, volumeLevel, isSpeaking }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Call Details</h2>
        <p>Volume Level: {volumeLevel}</p>
        <p>Assistant is speaking: {isSpeaking ? "Yes" : "No"}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CallModal;
