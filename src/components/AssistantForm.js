// Location: src/components/AssistantForm.js

import React, { useState } from "react";
import '../styles/AssistantForm.css';

const AssistantForm = ({ onAssistantCreated }) => {
  const [name, setName] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [instruction, setInstruction] = useState(""); // Custom instruction field for assistant
  const [voice, setVoice] = useState("andrew");
  const [language, setLanguage] = useState("en-US");

  const availableVoices = [
    { name: "Andrew", provider: "azure", voiceId: "andrew" },
    { name: "Brian", provider: "azure", voiceId: "brian" },
    { name: "Emma", provider: "azure", voiceId: "emma" },
    { name: "Cartesia", provider: "CartesiaVoice", voiceId: "sonic-english" },
    { name: "US Female", provider: "google-wavenet", voiceId: "Wavenet-F" },
    { name: "US Male", provider: "google-wavenet", voiceId: "Wavenet-M" },
    { name: "Andrea", provider: "11labs", voiceId: "andrea" },
    { name: "Burt", provider: "11labs", voiceId: "burt" },
    { name: "Drew", provider: "11labs", voiceId: "drew" },
    { name: "Joseph", provider: "11labs", voiceId: "joseph" },
    { name: "Marissa", provider: "11labs", voiceId: "marissa" },
    { name: "Mark", provider: "11labs", voiceId: "mark" },
    { name: "Matilda", provider: "11labs", voiceId: "matilda" },
    { name: "MRB", provider: "11labs", voiceId: "mrb" },
    { name: "Myra", provider: "11labs", voiceId: "myra" },
    { name: "Paul", provider: "11labs", voiceId: "paul" }
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
        keywords: []
      },
      model: {
        provider: "openai",
        model: "gpt-4-turbo",
        fallbackModels: ["gpt-4-turbo"],
        messages: [
          {
            role: "system",
            content: instruction || "You are a friendly customer support assistant. Say hi to the user."
          }
        ],
        temperature: 0.5,
        functions: [],
        maxTokens: 200
      },
      voice: {
        provider: selectedVoice.provider,
        voiceId: selectedVoice.voiceId,
        speed: 1.0
      },
      recordingEnabled: true,
      endCallFunctionEnabled: true,
      dialKeypadFunctionEnabled: false,
      hipaaEnabled: false,
      clientMessages: [],
      serverMessages: [],
      silenceTimeoutSeconds: 10,
      responseDelaySeconds: 1,
      llmRequestDelaySeconds: 0,
      numWordsToInterruptAssistant: 5,
      maxDurationSeconds: 300,
      backgroundSound: "office",
      voicemailDetectionEnabled: true,
      voicemailMessage: "Please leave a message and we’ll get back to you as soon as possible.",
      endCallMessage: "Thank you for calling. Have a great day!",
      endCallPhrases: ["goodbye", "end call", "terminate"]
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
          required
        />
      </label>

      <label>
        Welcome Message:
        <input
          type="text"
          value={welcomeMessage}
          onChange={(e) => setWelcomeMessage(e.target.value)}
          required
        />
      </label>

      <label>
        Instruction:
        <textarea
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          placeholder="e.g., You are a friendly customer support assistant. Greet the user warmly."
          rows="3"
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
        />
      </label>

      <button type="submit" className="submit-button">Create Assistant</button>
    </form>
  );
};

export default AssistantForm;
