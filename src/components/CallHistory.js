// Location: src/components/CallHistory.js

import React, { useEffect, useState } from 'react';
import SidebarMenu from './SidebarMenu'; // Ensures sidebar is on this page too
import { VapiClient } from '@vapi/server-sdk';

const CallHistory = () => {
  const [callHistory, setCallHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCallHistory = async () => {
      try {
        // Initialize VapiClient with the private key
        const client = new VapiClient({ token: process.env.VAPI_PRIVATE_KEY });

        // Fetch the list of calls
        const callList = await client.calls.list();
        
        // Fetch details for each call ID
        const callDetails = await Promise.all(
          callList.map(async (call) => {
            const details = await client.calls.get(call.id);
            return {
              id: details.id,
              date: details.createdAt,
              summary: details.analysis?.summary || 'No summary available',
              transcript: details.artifact?.transcript || 'Transcript not available',
            };
          })
        );

        // Set the call history state with fetched call details
        setCallHistory(callDetails);
      } catch (error) {
        setError(error.message || 'Failed to fetch call history');
      }
    };

    fetchCallHistory();
  }, []);

  return (
    <div className="call-history">
      <SidebarMenu /> {/* Sidebar menu for easy navigation */}
      <h2>Call History</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {callHistory.length > 0 ? (
        <ul>
          {callHistory.map((call) => (
            <li key={call.id}>
              <h3>Date: {new Date(call.date).toLocaleDateString()}</h3>
              <p>Summary: {call.summary}</p>
              <details>
                <summary>Transcript</summary>
                <p>{call.transcript}</p>
              </details>
            </li>
          ))}
        </ul>
      ) : (
        <p>No call history available.</p>
      )}
    </div>
  );
};

export default CallHistory;
