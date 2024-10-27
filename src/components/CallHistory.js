import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SidebarMenu from './SidebarMenu';

const CallHistory = () => {
  const [callHistory, setCallHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCallHistory = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/calls`, {
          headers: {
            'Authorization': `Bearer ${process.env.VAPI_PRIVATE_KEY}`, // Use the private key from env
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
