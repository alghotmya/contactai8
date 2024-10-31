// Location: src/components/SidebarMenu.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/SidebarMenu.css';

const SidebarMenu = () => {
  return (
    <div className="sidebar-menu">
      <h3 className="menu-title">Menu</h3>
      <ul className="menu-list">
        <li className="menu-item"><Link to="/main">Dashboard</Link></li>
        <li className="menu-item"><Link to="/call-history">View Call History</Link></li> {/* Call History link */}
        <li className="menu-item"><Link to="/settings">Settings</Link></li>
        <li className="menu-item"><Link to="/signout">Sign Out</Link></li>
      </ul>
    </div>
  );
};

export default SidebarMenu;
