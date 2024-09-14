// File: src/components/Settings.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Settings.css'; 

function Settings() {
  const [knowledgeBaseFile, setKnowledgeBaseFile] = useState(null);
  const [syncMessage, setSyncMessage] = useState('');
  const agentId = 'E4UXSHY5Y7'; // Use your specific agent ID
  const knowledgeBaseId = 'SY0DQHPVRD'; // Use your knowledge base ID

  const handleKnowledgeBaseSync = async () => {
    const token = localStorage.getItem('id_token');
    const formData = new FormData();
    formData.append('file', knowledgeBaseFile);
    formData.append('agentId', agentId);
    formData.append('knowledgeBaseId', knowledgeBaseId);

    try {
      const response = await axios.post('https://dqjq6f5kaa.execute-api.ca-central-1.amazonaws.com/prod/knowledge-base/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });
      setSyncMessage('Knowledge Base Synced Successfully');
    } catch (error) {
      setSyncMessage('Error syncing Knowledge Base');
      console.error('Error syncing knowledge base:', error);
    }
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <div className="knowledge-base-sync">
        <h3>Upload Knowledge Base</h3>
        <input type="file" onChange={(e) => setKnowledgeBaseFile(e.target.files[0])} />
        <button onClick={handleKnowledgeBaseSync} className="button-primary">Sync Knowledge Base</button>
        {syncMessage && <p>{syncMessage}</p>}
      </div>
    </div>
  );
}

export default Settings;
