// Location: src/components/SidebarMenu.js

import React from 'react';
import { Link } from 'react-router-dom';

const SidebarMenu = () => {
  return (
    <div className="sidebar">
      <h3>Menu</h3>
      <ul>
        <li><Link to="/main">Dashboard</Link></li>
        <li><Link to="/call-history">View Call History</Link></li> {/* Call History link */}
        <li><Link to="/settings">Settings</Link></li>
        <li><Link to="/signout">Sign Out</Link></li>
      </ul>
    </div>
  );
};

export default SidebarMenu;
