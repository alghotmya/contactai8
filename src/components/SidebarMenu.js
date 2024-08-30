// Location: src/components/SidebarMenu.js

import React from 'react';

const SidebarMenu = () => {
  return (
    <nav className="sidebar-menu">
      <ul>
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
