import React, { useState } from 'react';
import axios from 'axios';

function Dashboard() {
    const [responseMessage, setResponseMessage] = useState('');

    // Function to handle the API call
    const handleApiCall = async () => {
        try {
            const token = localStorage.getItem('id_token'); // Assuming you store the id_token in localStorage after login
            const response = await axios.get('https://dqjq6f5kaa.execute-api.ca-central-1.amazonaws.com/prod/workspaces', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setResponseMessage(JSON.stringify(response.data)); // Display the response in the UI
        } catch (error) {
            console.error('Error calling the API:', error);
            setResponseMessage('Error calling the API: ' + error.message);
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleApiCall}>Test API Call</button>
            {responseMessage && <p>API Response: {responseMessage}</p>}
        </div>
    );
}

export default Dashboard;
