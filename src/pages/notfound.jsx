// src/pages/NotFound.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <FontAwesomeIcon icon={faExclamationTriangle} size="5x" />
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
};

export default NotFound;