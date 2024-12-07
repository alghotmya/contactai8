import React, { useState } from "react";
import Vapi from "@vapi-ai/web";

const AssistantForm = ({ onAssistantCreated }) => {
  const [name, setName] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [voice, setVoice] = useState("andrew");
  const [language, setLanguage] = useState("en-US");
  const [instruction, setInstruction] = useState(
    `You are a voice assistant for Termain's Dental, responsible for booking appointments...` // Your full instruction text here
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

    if (!instruction.trim()) {
      alert("System prompt (instruction) cannot be empty. Please provide a valid instruction.");
      return;
    }

    console.log("Final system prompt being used:", instruction);

    const selectedVoice = availableVoices.find(v => v.voiceId === voice) || {};

    const assistantConfig = {
      id: "6be70999-50ec-4d33-a028-64e2887a871c",
      name: name || undefined,
      firstMessage: welcomeMessage || undefined,
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: language || "en-US",
      },
      model: {
        provider: "openai",
        model: "gpt-4-turbo",
        fallbackModels: ["gpt-4-turbo"],
        linkedToolId: "2a3a77fe-436b-4710-8af1-50b852f5b728",
        tools: [{
          type: "function",
          function: {
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
          }
        }]
      },
      voice: {
        provider: selectedVoice.provider || "azure",
        voiceId: selectedVoice.voiceId || "andrew",
        speed: 1.0,
        chunkPlan: {
          enabled: true,
          minCharacters: 30,
          punctuationBoundaries: [".", "?", "!"],
        },
      },
      assistantOverrides: {
        model: {
          provider: "openai",
          model: "gpt-4-turbo",
          messages: [
            {
              role: "system",
              content: instruction
            }
          ],
          tools: [{
            type: "function",
            function: {
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
            }
          }]
        }
      }
    };

    console.log("Creating or updating assistant with configuration:", JSON.stringify(assistantConfig, null, 2));

    try {
      await onAssistantCreated(assistantConfig);
      console.log("Assistant created or updated successfully with new system prompt and tools configuration.");
    } catch (err) {
      console.error("Error creating or updating assistant:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="assistant-form">
      <label>
        Assistant Name (optional):
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Leave blank to use default"
        />
      </label>

      <label>
        Welcome Message (optional):
        <input
          type="text"
          value={welcomeMessage}
          onChange={(e) => setWelcomeMessage(e.target.value)}
          placeholder="Leave blank to use default"
        />
      </label>

      <label>
        Voice (optional):
        <select
          value={voice}
          onChange={(e) => setVoice(e.target.value)}
        >
          <option value="">Default Voice</option>
          {availableVoices.map((v) => (
            <option key={v.voiceId} value={v.voiceId}>
              {v.name} ({v.provider})
            </option>
          ))}
        </select>
      </label>

      <label>
        Language (optional):
        <input
          type="text"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          placeholder="Leave blank to use default"
        />
      </label>

      <label>
        System Prompt (editable):
        <textarea
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          rows="10"
        />
      </label>

      <button type="submit">Create and Update Assistant</button>
    </form>
  );
};

export default AssistantForm;