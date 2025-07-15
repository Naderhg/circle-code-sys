import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCode,
  faThLarge, 
  faShippingFast, 
  faPlusCircle, 
  faWallet, 
  faUserCog, 
  faSignOutAlt 
} from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };
  
  return (
    <div className="sidebar">
      <div className="logo">
        <div className="logo-icon">
          <FontAwesomeIcon icon={faCode} />
        </div>
        <div className="logo-text">
          <h2>CIRCLE CODE</h2>
          <p>Seller Portal</p>
        </div>
      </div>

      <div className="user-welcome">
        <div className="user-avatar">
          {currentUser && currentUser.name ? currentUser.name.charAt(0) : 'S'}
        </div>
        <span>Welcome, {currentUser ? currentUser.name || 'Seller' : 'Seller'}</span>
      </div>

      <ul className="nav-menu">
        <li>
          <NavLink 
            to="/" 
            end 
            className={({isActive}) => isActive ? 'active' : ''}
          >
            <FontAwesomeIcon icon={faThLarge} /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/shipments" 
            className={({isActive}) => isActive ? 'active' : ''}
          >
            <FontAwesomeIcon icon={faShippingFast} /> My Shipments
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/create" 
            className={({isActive}) => isActive ? 'active' : ''}
          >
            <FontAwesomeIcon icon={faPlusCircle} /> Create Shipment
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/wallet" 
            className={({isActive}) => isActive ? 'active' : ''}
          >
            <FontAwesomeIcon icon={faWallet} /> Wallet
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/profile" 
            className={({isActive}) => isActive ? 'active' : ''}
          >
            <FontAwesomeIcon icon={faUserCog} /> Profile
          </NavLink>
        </li>
      </ul>

      <div className="logout">
        <a href="#" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Log Out
        </a>
      </div>
    </div>
  );
};

export default Sidebar;