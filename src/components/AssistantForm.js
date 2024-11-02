// Location: src/components/AssistantForm.js

import React, { useState } from "react";
import '../styles/AssistantForm.css';
import { AiOutlineUserAdd } from 'react-icons/ai'; // Importing an icon

const AssistantForm = ({ onAssistantCreated }) => {
  const [name, setName] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [instruction, setInstruction] = useState("");
  const [voice, setVoice] = useState(""); // Allow voice to be blank for optional override
  const [language, setLanguage] = useState("en-US");
  const [maxDuration, setMaxDuration] = useState(600); // Field for max duration
  const [responseDelay, setResponseDelay] = useState(2); // Field for response delay
  const [silenceTimeout, setSilenceTimeout] = useState(10);
  const [emotionRecognition, setEmotionRecognition] = useState(false);
  const [backgroundSound, setBackgroundSound] = useState("office");
  const [hipaaEnabled, setHipaaEnabled] = useState(false);
  const [fillerInjection, setFillerInjection] = useState(false);
  const [chunkPlan, setChunkPlan] = useState("default");
  const [backchanneling, setBackchanneling] = useState(false);
  const [artifactPlan, setArtifactPlan] = useState("basic");
  const [messagePlan, setMessagePlan] = useState("standard");
  const [monitorPlan, setMonitorPlan] = useState("default");
  const [credentialId, setCredentialId] = useState("");

  const availableVoices = [
    { name: "Andrew", provider: "azure", voiceId: "andrew" },
    { name: "Brian", provider: "azure", voiceId: "brian" },
    // Add more voices as needed
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if voice is provided; if not, do not include voice configuration
    const selectedVoice = voice
      ? availableVoices.find((v) => v.voiceId === voice)
      : null;

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
        maxTokens: 500,
        semanticCachingEnabled: true,
        emotionRecognition: emotionRecognition,
      },
      // Only include the voice section if selectedVoice exists
      ...(selectedVoice && {
        voice: {
          provider: selectedVoice.provider,
          voiceId: selectedVoice.voiceId,
          chunkPlan: chunkPlan,
          fillerInjection: fillerInjection,
          speed: 1.0,
        }
      }),
      callBehavior: {
        firstMessageMode: "standard",
        hipaaEnabled: hipaaEnabled,
        silenceTimeoutSeconds: silenceTimeout,
        maxDurationSeconds: maxDuration,
        backgroundSound: backgroundSound,
        backchannelingEnabled: backchanneling,
      },
      transportConfigurations: {
        transportPlan: "default",
      },
      messagePlan: messagePlan,
      artifactPlan: artifactPlan,
      monitorPlan: monitorPlan,
      credentialId: credentialId,
      responseDelaySeconds: responseDelay,
      recordingEnabled: true,
      endCallFunctionEnabled: true,
      voicemailDetectionEnabled: true,
      dialKeypadFunctionEnabled: false,
      numWordsToInterruptAssistant: 5,
    };

    console.log("Assistant Configuration:", assistantConfig);

    // Ensure the config matches the API's expected format
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
        Voice (Optional):
        <select
          value={voice}
          onChange={(e) => setVoice(e.target.value)}
        >
          <option value="">Default</option>
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

      <label>
        Silence Timeout (seconds):
        <input
          type="number"
          value={silenceTimeout}
          onChange={(e) => setSilenceTimeout(parseInt(e.target.value))}
          placeholder="e.g., 10"
        />
      </label>

      <label>
        Enable HIPAA Compliance:
        <input
          type="checkbox"
          checked={hipaaEnabled}
          onChange={(e) => setHipaaEnabled(e.target.checked)}
        />
      </label>

      <label>
        Enable Emotion Recognition:
        <input
          type="checkbox"
          checked={emotionRecognition}
          onChange={(e) => setEmotionRecognition(e.target.checked)}
        />
      </label>

      <label>
        Background Sound:
        <input
          type="text"
          value={backgroundSound}
          onChange={(e) => setBackgroundSound(e.target.value)}
          placeholder="e.g., office"
        />
      </label>

      <label>
        Chunk Plan:
        <input
          type="text"
          value={chunkPlan}
          onChange={(e) => setChunkPlan(e.target.value)}
          placeholder="e.g., default"
        />
      </label>

      <label>
        Artifact Plan:
        <input
          type="text"
          value={artifactPlan}
          onChange={(e) => setArtifactPlan(e.target.value)}
          placeholder="e.g., basic"
        />
      </label>

      <label>
        Message Plan:
        <input
          type="text"
          value={messagePlan}
          onChange={(e) => setMessagePlan(e.target.value)}
          placeholder="e.g., standard"
        />
      </label>

      <label>
        Monitor Plan:
        <input
          type="text"
          value={monitorPlan}
          onChange={(e) => setMonitorPlan(e.target.value)}
          placeholder="e.g., default"
        />
      </label>

      <label>
        Credential ID:
        <input
          type="text"
          value={credentialId}
          onChange={(e) => setCredentialId(e.target.value)}
          placeholder="e.g., your-credential-id"
        />
      </label>

      <button type="submit" className="submit-button">
        <AiOutlineUserAdd /> Create Assistant
      </button>
    </form>
  );
};

export default AssistantForm;
