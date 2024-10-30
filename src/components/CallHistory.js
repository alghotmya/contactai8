// Location: src/components/CallHistory.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SidebarMenu from './SidebarMenu';
import './CallHistory.css';

const CallHistory = () => {
  const [callHistory, setCallHistory] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const callsPerPage = 5; // Number of calls to display per page

  useEffect(() => {
    const fetchCallHistory = async () => {
      try {
        const response = await axios.get('https://api.vapi.ai/call', {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_VAPI_PRIVATE_KEY}`, // Use the private key from env
          },
          params: {
            limit: 50, // Fetch more data initially
          },
        });
        setCallHistory(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCallHistory();
  }, []);

  // Pagination logic
  const indexOfLastCall = currentPage * callsPerPage;
  const indexOfFirstCall = indexOfLastCall - callsPerPage;
  const currentCalls = callHistory.slice(indexOfFirstCall, indexOfLastCall);
  const totalPages = Math.ceil(callHistory.length / callsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="call-history-container">
      <SidebarMenu />
      <div className="call-history-content">
        <h2>Call History</h2>
        {error && <p className="error-message">{error}</p>}
        <table className="call-history-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Summary</th>
              <th>Transcript</th>
            </tr>
          </thead>
          <tbody>
            {currentCalls.length > 0 ? (
              currentCalls.map((call) => (
                <tr key={call.id}>
                  <td>{new Date(call.createdAt).toLocaleDateString()}</td>
                  <td>{call.analysis?.summary || 'No summary available'}</td>
                  <td>
                    <details>
                      <summary>View Transcript</summary>
                      <p>{call.artifact?.transcript || 'Transcript not available'}</p>
                    </details>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="no-history">No call history available.</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default CallHistory;
