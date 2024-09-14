import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/SidebarMenu.css'; // Ensure you have a separate CSS file for the Sidebar

const SidebarMenu = () => {
    return (
        <div className="sidebar-menu">
            <ul>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/settings">Settings</Link></li>
                <li><Link to="/support">Support</Link></li>
                <li><Link to="/documentation">Documentation</Link></li>
                <li><Link to="/reporting">Reporting</Link></li>
            </ul>
        </div>
    );
};

export default SidebarMenu;
