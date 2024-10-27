import React from "react";

const AssistantList = ({ assistants, onSelectAssistant }) => {
  return (
    <div className="container saved-assistants">
      <h2>Saved Assistants</h2>
      <ul>
        {assistants.map((assistant, index) => (
          <li
            key={index}
            onClick={() => onSelectAssistant(assistant)}
            className="assistant-item"
          >
            <span className="assistant-info">
              {assistant.name} - {assistant.firstMessage}
            </span>
            <button className="delete-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssistantList;
