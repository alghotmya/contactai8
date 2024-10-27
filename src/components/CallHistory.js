// Location: src/components/CallHistory.js

import React, { useEffect, useState } from 'react';

const CallHistory = () => {
  const [callHistory, setCallHistory] = useState([]);

  useEffect(() => {
    // Replace this with the actual API call to fetch call history
    const fetchCallHistory = async () => {
      // Simulate fetching data
      const mockCallHistory = [
        {
          id: 1,
          date: '2023-10-25',
          summary: 'Call with assistant 1',
          transcript: 'Full transcript of call 1...',
        },
        {
          id: 2,
          date: '2023-10-26',
          summary: 'Call with assistant 2',
          transcript: 'Full transcript of call 2...',
        },
      ];
      setCallHistory(mockCallHistory);
    };

    fetchCallHistory();
  }, []);

  return (
    <div className="call-history">
      <h2>Call History</h2>
      {callHistory.length > 0 ? (
        <ul>
          {callHistory.map((call) => (
            <li key={call.id}>
              <h3>Date: {call.date}</h3>
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
