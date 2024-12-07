import React, { useState } from "react";
import axios from "axios";

const AssistantForm = ({ onAssistantCreated }) => {
  const [assistantName, setAssistantName] = useState(""); // Changed from 'name' to 'assistantName'
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("andrew");
  const [language, setLanguage] = useState("en-US");
  const [instruction, setInstruction] = useState(
    `You are a voice assistant for Termain's Dental...` // Your full prompt here
  );

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

    const currentVoice = availableVoices.find(v => v.voiceId === selectedVoice) || {};

    const toolDefinition = {
      name: "Booking",
      description: "Book an appointment",
      parameters: {
        type: "object",
        properties: {
          startTime: {
            type: "string",
            description: "Start time of the appointment in ISO format"
          },
          attendeeName: {
            type: "string",
            description: "Name of the attendee"
          },
          attendeeEmail: {
            type: "string",
            description: "Email of the attendee"
          }
        },
        required: ["startTime", "attendeeName", "attendeeEmail"]
      }
    };

    const assistantConfig = {
      firstMessage: welcomeMessage || "Hello! I'm here to help you book an appointment.",
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: language || "en-US"
      },
      voice: {
        provider: currentVoice.provider || "azure",
        voiceId: currentVoice.voiceId || "andrew"
      },
      model: {
        provider: "openai",
        model: "gpt-4-turbo",
        messages: [
          {
            role: "system",
            content: instruction
          }
        ],
        tools: [
          {
            type: "function",
            function: toolDefinition
          }
        ]
      }
    };

    // Add assistant name if provided
    if (assistantName) {
      assistantConfig.name = assistantName;
    }

    try {
      console.log('Sending configuration:', JSON.stringify(assistantConfig, null, 2));

      const response = await axios.post(
        'https://api.vapi.ai/assistant',
        assistantConfig,
        {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_VAPI_PRIVATE_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Assistant created successfully:', response.data);
      
      if (onAssistantCreated) {
        onAssistantCreated(response.data);
      }
    } catch (err) {
      console.error('Error creating assistant:', err.response?.data || err.message);
      alert('Failed to create assistant: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="assistant-form">
      <div className="form-group">
        <label>
          Assistant Name (optional):
          <input
            type="text"
            value={assistantName}
            onChange={(e) => setAssistantName(e.target.value)}
            placeholder="Leave blank to use default"
            className="form-control"
          />
        </label>
      </div>

      <div className="form-group">
        <label>
          Welcome Message (optional):
          <input
            type="text"
            value={welcomeMessage}
            onChange={(e) => setWelcomeMessage(e.target.value)}
            placeholder="Leave blank to use default"
            className="form-control"
          />
        </label>
      </div>

      <div className="form-group">
        <label>
          Voice:
          <select
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
            className="form-control"
          >
            {availableVoices.map((v) => (
              <option key={v.voiceId} value={v.voiceId}>
                {v.name} ({v.provider})
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-group">
        <label>
          Language:
          <input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            placeholder="en-US"
            className="form-control"
          />
        </label>
      </div>

      <div className="form-group">
        <label>
          System Prompt:
          <textarea
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            rows="10"
            className="form-control"
          />
        </label>
      </div>

      <button type="submit" className="btn btn-primary">
        Create Assistant
      </button>
    </form>
  );
};

export default AssistantForm;