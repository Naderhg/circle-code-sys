// src/components/common/TopBar.jsx
import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faMoon, faSun, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '../../context/ThemeContext';
import { useLocation } from 'react-router-dom';

const TopBar = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  
  // Get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === '/') return 'Seller Dashboard';
    if (path === '/shipments') return 'My Shipments';
    if (path === '/create') return 'Create New Shipment';
    if (path === '/wallet') return 'Wallet';
    if (path === '/profile') return 'Profile';
    
    return 'Seller Portal';
  };
  
  return (
    <div className="top-bar">
      <h1>{getPageTitle()}</h1>
      <div className="top-bar-right">
        <button className="notification-btn">
          <FontAwesomeIcon icon={faBell} />
        </button>
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
        </button>
        <button className="profile-btn">
          <FontAwesomeIcon icon={faUserCircle} />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
