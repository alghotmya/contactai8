import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SidebarMenu from './SidebarMenu';

const CallHistory = () => {
  const [callHistory, setCallHistory] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCallHistory = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/call?limit=7`, {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_VAPI_PUBLIC_KEY}`, // Using the public key here
          },
        });

        setCallHistory(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch call history. Please try again later.');
        setLoading(false);
      }
    };

    fetchCallHistory();
  }, []);

  return (
    <div className="call-history">
      <SidebarMenu />
      <h2>Call History</h2>
      {loading && <p>Loading call history...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {callHistory.length > 0 ? (
        <ul>
          {callHistory.map((call) => (
            <li key={call.id} className="call-item">
              <h3>Call Date: {new Date(call.createdAt).toLocaleDateString()}</h3>
              <p><strong>Status:</strong> {call.status}</p>
              <p><strong>Ended Reason:</strong> {call.endedReason}</p>
              <p><strong>Summary:</strong> {call.analysis?.summary || 'No summary available'}</p>
              <details>
                <summary>Transcript</summary>
                <p>{call.artifact?.transcript || 'Transcript not available'}</p>
              </details>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No call history available.</p>
      )}
    </div>
  );
};

export default CallHistory;
