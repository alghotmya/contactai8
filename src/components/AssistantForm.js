import React, { useState } from "react";

const AssistantForm = ({ onAssistantCreated }) => {
  const [name, setName] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [voice, setVoice] = useState("andrew");
  const [language, setLanguage] = useState("en-US");

  const availableVoices = [
    { name: "Andrew", provider: "azure", voiceId: "andrew" },
    { name: "Brian", provider: "azure", voiceId: "brian" },
    { name: "Emma", provider: "azure", voiceId: "emma" },
    { name: "Cartesia", provider: "CartesiaVoice", voiceId: "sonic-english" },
    { name: "US Female", provider: "google-wavenet", voiceId: "Wavenet-F" },
    { name: "US Male", provider: "google-wavenet", voiceId: "Wavenet-M" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedVoice = availableVoices.find(v => v.voiceId === voice);

    const assistantConfig = {
      name,
      firstMessage: welcomeMessage,
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language,
      },
      voice: {
        provider: selectedVoice.provider,
        voiceId: selectedVoice.voiceId,
        speed: 1.0,
        chunkPlan: {
          enabled: true,
          minCharacters: 30,
          punctuationBoundaries: [".", "?", "!"],
        },
      },
    };

    try {
      onAssistantCreated(assistantConfig);
      console.log("Assistant created successfully:", assistantConfig);
    } catch (err) {
      console.error("Error creating assistant:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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

      <button type="submit">Create Assistant</button>
    </form>
  );
};

export default AssistantForm;
