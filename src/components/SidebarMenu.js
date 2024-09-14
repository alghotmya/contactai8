import React from 'react';
import '../styles/SidebarMenu.css'; // Ensure this path is correct

const SidebarMenu = () => {
  return (
    <nav className="sidebar-menu">
      <ul>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/agent">Agent Management</a></li>
        <li><a href="/settings">Settings</a></li>
        <li><a href="/support">Support</a></li>
        <li><a href="/documentation">Documentation</a></li>
        <li><a href="/reporting">Reporting</a></li>
      </ul>
    </nav>
  );
};

export default SidebarMenu;
