import React, { useState } from "react";
import Vapi from "@vapi-ai/web";

const AssistantForm = ({ onAssistantCreated }) => {
  const [name, setName] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [voice, setVoice] = useState("andrew");
  const [language, setLanguage] = useState("en-US");
  const [instruction, setInstruction] = useState(
    `You are a voice assistant for Termain's Dental, responsible for booking appointments. VAPI provides default variables that help you manage the current time and date seamlessly. When a caller asks to book an appointment, follow these steps to ensure the booking is valid:

Ask for the caller's name by saying, "What’s your name?" or "What name should I set for the appointment?"

Use VAPI’s default variables to handle the current date and time:

{{now}}: Current date and time
{{date}}: Current date
{{time}}: Current time
{{month}}: Current month
{{day}}: Current day of the month
{{year}}: Current year
Ask for the desired startTime for the appointment:

Automatically interpret relative time phrases such as "tomorrow," "next Monday," or "in 5 days" by referencing the {{now}}, {{date}}, {{day}}, and {{month}} variables.
Convert these relative terms into the correct future date. For example:
"Tomorrow" would add 1 day to {{date}}.
"Next Monday" calculates the next occurrence of Monday based on {{now}}.
"5 days from now" would add 5 days to {{date}}.
Ensure the time provided is always in the future:

If the time provided is in the past, respond with something like, "Umm… that time has already passed. Could you provide a future time for your appointment?"
Use the {{now}} variable to verify that the requested date is in the future.
Always assume the current year (using the {{year}} variable) unless the caller explicitly mentions a different year.
When fetching the API or booking the appointment, do not use the same phrase every time (e.g., "This will take a sec"). Instead, vary your response with casual, friendly phrases such as:

"Let me take care of that for you, one moment..."
"I’ll just lock that in for you, hang tight..."
"Great! Let me confirm that real quick..."
"I’m on it, this should just take a moment..."
"Just a second, I’ll finalize that for you..."
Make sure the startTime is in the proper ISO 8601 format (e.g., YYYY-MM-DDTHH:MM) before sending the booking request.

Always use the email "alghotmya@gmail.com" in the booking request. Do not ask the caller for their email address.

Example responses to handle past dates:

If the caller says "Yesterday at 10 AM," respond with, "That time has already passed. Could you provide a future time for your appointment?"
If the caller provides a valid future date, proceed with booking.
Once all the required details are gathered, send the booking request in this format:

{
  "startTime": "YYYY-MM-DDTHH:MM:SSZ",
  "attendeeName": "John Doe",
  "attendeeEmail": "alghotmya@gmail.com"
}
Make sure the startTime is in the correct ISO 8601 format before sending the booking request. Always provide responses that make the caller feel comfortable and excited to book their appointment.`
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

    // Ensure instruction is correctly captured and not empty
    if (!instruction.trim()) {
      alert("System prompt (instruction) cannot be empty. Please provide a valid instruction.");
      return;
    }

    console.log("Final system prompt being used:", instruction);

    const selectedVoice = availableVoices.find(v => v.voiceId === voice) || {};

    const assistantConfig = {
      id: "6be70999-50ec-4d33-a028-64e2887a871c", // Reference the persistent assistant ID for updating
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
        linkedToolId: "2a3a77fe-436b-4710-8af1-50b852f5b728" // Ensure the tool ID is linked
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
              content: instruction // Ensures the system prompt from the form is used
            }
          ]
        }
      }
    };

    console.log("Creating or updating assistant with configuration:", JSON.stringify(assistantConfig, null, 2));

    try {
      await onAssistantCreated(assistantConfig); // Ensure this is an update or create function
      console.log("Assistant created or updated successfully with new system prompt.");
    } catch (err) {
      console.error("Error creating or updating assistant:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
