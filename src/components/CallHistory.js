import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SidebarMenu from './SidebarMenu';

const CallHistory = () => {
  const [callHistory, setCallHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCallHistory = async () => {
      try {
        // Update the URL and add limit as a query parameter
        const response = await axios.get('https://api.vapi.ai/call', {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_VAPI_PRIVATE_KEY}`, // Use the private key from env
          },
          params: {
            limit: 7, // Set the limit parameter for the API request
          },
        });
        setCallHistory(response.data); // Assuming response.data is an array of call objects
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCallHistory();
  }, []);

  return (
    <div className="call-history">
      <SidebarMenu />
      <h2>Call History</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {callHistory.length > 0 ? (
        <ul>
          {callHistory.map((call) => (
            <li key={call.id}>
              <h3>Date: {new Date(call.createdAt).toLocaleDateString()}</h3>
              <p>Summary: {call.analysis?.summary || 'No summary available'}</p>
              <details>
                <summary>Transcript</summary>
                <p>{call.artifact?.transcript || 'Transcript not available'}</p>
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
