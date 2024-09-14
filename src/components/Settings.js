import React, { useState } from 'react';
import axios from 'axios'; // For making API calls
import '../styles/Settings.css'; // Import CSS

const Settings = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  // Function to handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Function to handle knowledge base syncing
  const handleKnowledgeBaseSync = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // Post file to the upload API
      const response = await axios.post('https://dqjq6f5kaa.execute-api.ca-central-1.amazonaws.com/prod/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Knowledge base synced successfully');
    } catch (error) {
      console.error('Error syncing knowledge base:', error);
      alert('Failed to sync knowledge base');
    }
  };

  return (
    <div className="settings">
      <h2>Settings</h2>

      <div className="upload-section">
        <h3>Upload Knowledge Base</h3>
        <input type="file" onChange={handleFileChange} />
        <button className="button-primary" onClick={handleKnowledgeBaseSync}>Sync Knowledge Base</button>
      </div>
    </div>
  );
};

export default Settings;
