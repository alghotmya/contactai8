import React from "react";

const AssistantList = ({ assistants, onSelectAssistant }) => {
  return (
    <div>
      <h2>Saved Assistants</h2>
      <ul>
        {assistants.map((assistant, index) => (
          <li
            key={index}
            onClick={() => onSelectAssistant(assistant)} // When an assistant is clicked, pass it to the parent component
            style={{ cursor: "pointer", padding: "5px", border: "1px solid #ddd" }}
          >
            {assistant.name} - {assistant.firstMessage}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssistantList;
