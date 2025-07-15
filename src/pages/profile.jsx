// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import SellerLayout from '../components/layout/SellerLayout';
import { getCurrentUser } from '../services/authService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await getCurrentUser();
        setUser(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!user) {
    return <div className="error-message">User not found.</div>;
  }

  return (
    <SellerLayout>
      <h2>My Profile</h2>
      <div className="profile-container">
        <div className="profile-header">
          <div className="user-avatar">
            <FontAwesomeIcon icon={faUserCircle} />
          </div>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
        <div className="profile-details">
          <h4>Account Details</h4>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </SellerLayout>
  );
};

export default Profile;