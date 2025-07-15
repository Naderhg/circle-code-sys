// src/components/common/StatCard.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StatCard = ({ 
  title, 
  value, 
  description, 
  icon, 
  onClick 
}) => {
  return (
    <div 
      className={`stat-card ${onClick ? 'clickable' : ''}`}
      onClick={onClick}
    >
      <div className="stat-content">
        <h3>{title}</h3>
        <h2>{value}</h2>
        <p>{description}</p>
      </div>
      <div className="stat-icon">
        <FontAwesomeIcon icon={icon} />
      </div>
    </div>
  );
};

export default StatCard;
