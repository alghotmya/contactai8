// Location: src/components/AssistantForm.js

import React, { useState } from "react";
import '../styles/AssistantForm.css';
import { AiOutlineUserAdd } from 'react-icons/ai'; // Importing an icon

const AssistantForm = ({ onAssistantCreated }) => {
  const [name, setName] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [instruction, setInstruction] = useState("");
  const [voice, setVoice] = useState("andrew");
  const [language, setLanguage] = useState("en-US");
  const [maxDuration, setMaxDuration] = useState(600); // Added field for max duration
  const [responseDelay, setResponseDelay] = useState(2); // Added field for response delay

  const availableVoices = [
    { name: "Andrew", provider: "azure", voiceId: "andrew" },
    { name: "Brian", provider: "azure", voiceId: "brian" },
    // Add more voices as needed
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedVoice = availableVoices.find((v) => v.voiceId === voice);

    const assistantConfig = {
      name,
      firstMessage: welcomeMessage,
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: language,
      },
      model: {
        provider: "openai",
        model: "gpt-4-turbo",
        fallbackModels: ["gpt-4-turbo"],
        messages: [
          {
            role: "system",
            content: instruction || "You are a friendly customer support assistant that retains context and remembers user interactions for seamless support."
          }
        ],
        temperature: 0.5,
        maxTokens: 500, // Adjusted for longer context handling
        semanticCachingEnabled: true // Ensures the assistant retains context
      },
      voice: {
        provider: selectedVoice.provider,
        voiceId: selectedVoice.voiceId,
      },
      recordingEnabled: true,
      endCallFunctionEnabled: true,
      dialKeypadFunctionEnabled: false,
      hipaaEnabled: false,
      silenceTimeoutSeconds: 10,
      responseDelaySeconds: responseDelay,
      numWordsToInterruptAssistant: 5,
      maxDurationSeconds: maxDuration,
      backgroundSound: "office",
      voicemailDetectionEnabled: true
    };

    console.log("Assistant Configuration:", assistantConfig);

    onAssistantCreated(assistantConfig);
  };

  return (
    <form onSubmit={handleSubmit} className="assistant-form container">
      <label>
        Assistant Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., John"
          required
        />
      </label>

      <label>
        Welcome Message:
        <input
          type="text"
          value={welcomeMessage}
          onChange={(e) => setWelcomeMessage(e.target.value)}
          placeholder="e.g., Hello, how can I assist you?"
          required
        />
      </label>

      <label>
        Instruction:
        <textarea
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          placeholder="e.g., You are a friendly customer support assistant that remembers past conversations."
          rows="2"
        />
      </label>

      <label>
        Voice:
        <select
          value={voice}
          onChange={(e) => setVoice(e.target.value)}
          required
        >
          {availableVoices.map((v) => (
            <option key={v.voiceId} value={v.voiceId}>
              {v.name} ({v.provider})
            </option>
          ))}
        </select>
      </label>

      <label>
        Language:
        <input
          type="text"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          placeholder="e.g., en-US"
        />
      </label>

      <label>
        Max Call Duration (seconds):
        <input
          type="number"
          value={maxDuration}
          onChange={(e) => setMaxDuration(parseInt(e.target.value))}
          placeholder="e.g., 600"
        />
      </label>

      <label>
        Response Delay (seconds):
        <input
          type="number"
          value={responseDelay}
          onChange={(e) => setResponseDelay(parseInt(e.target.value))}
          placeholder="e.g., 2"
        />
      </label>

      <button type="submit" className="submit-button">
        <AiOutlineUserAdd /> Create Assistant
      </button>
    </form>
  );
};

export default AssistantForm;
