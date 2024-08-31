// Location: src/components/MainContent.js

import React from 'react';

const MainContent = ({ selectedWorkspace }) => {
  return (
    <div className="main-content">
      {selectedWorkspace ? (
        <div>
          <h2>Workspace Details</h2>
          <p>Displaying details for workspace: {selectedWorkspace}</p>
          {/* You can include more detailed workspace information here */}
        </div>
      ) : (
        <p>Please select a workspace from the sidebar.</p>
      )}
    </div>
  );
};

export default MainContent;
