// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import SellerLayout from '../components/Layout/sellerLayout';
import { getCurrentUser } from '../services/authservice';
import { getShipments } from '../services/shipmentservice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserCircle, 
  faUser, 
  faEnvelope, 
  faPhone, 
  faBriefcase, 
  faCalendarAlt, 
  faEdit, 
  faShieldAlt, 
  faShippingFast, 
  faMapMarkerAlt, 
  faIdCard,
  faEye,
  faBoxOpen
} from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [recentShipments, setRecentShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        
        // Get user data
        const userData = await getCurrentUser();
        
        // Enrich with more mock data for this demo
        const enhancedUserData = {
          ...userData,
          phone: '+1 (555) 123-4567',
          address: '123 Main Street, New York, NY 10001',
          createdAt: '2023-01-15T10:30:00Z',
          accountType: 'Business',
          verificationStatus: 'Verified',
          preferences: {
            notifications: true,
            newsletter: false,
            twoFactorAuth: true
          }
        };
        
        setUser(enhancedUserData);
        setFormData({
          name: enhancedUserData.name,
          email: enhancedUserData.email,
          phone: enhancedUserData.phone,
          address: enhancedUserData.address
        });
        
        // Get recent shipments
        const shipmentsResponse = await getShipments(1, 3);
        setRecentShipments(shipmentsResponse.data.items || []);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfileData();
  }, []);
  
  const handleEditToggle = () => {
    setEditMode(!editMode);
    
    // Reset form if cancelling edit
    if (editMode) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address
      });
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would call an API to update the user profile
    setUser({
      ...user,
      ...formData
    });
    setEditMode(false);
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

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
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <FontAwesomeIcon icon={faUserCircle} />
          </div>
          <h3 className="profile-name">{user.name}</h3>
          <p className="profile-email">{user.email}</p>
          <span className="badge">{user.role.toUpperCase()}</span>
          
          <div className="profile-actions">
            <button 
              className={`profile-btn ${editMode ? 'outline' : ''}`}
              onClick={handleEditToggle}
            >
              <FontAwesomeIcon icon={faEdit} /> {editMode ? 'Cancel Edit' : 'Edit Profile'}
            </button>
          </div>
        </div>
        
        {editMode ? (
          /* Edit Profile Form */
          <div className="info-card">
            <h3 className="info-card-title">
              <FontAwesomeIcon icon={faEdit} /> Edit Profile Information
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  className="form-control"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>
              
              <div className="action-buttons">
                <button 
                  type="button" 
                  className="cancel-btn" 
                  onClick={handleEditToggle}
                >
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Profile Information Cards */
          <div className="profile-info-grid">
            <div className="info-card">
              <h3 className="info-card-title">
                <FontAwesomeIcon icon={faUser} /> Personal Information
              </h3>
              
              <ul className="info-list">
                <li className="info-item">
                  <span className="info-label">Full Name</span>
                  <span className="info-value">{user.name}</span>
                </li>
                <li className="info-item">
                  <span className="info-label">Email</span>
                  <span className="info-value">{user.email}</span>
                </li>
                <li className="info-item">
                  <span className="info-label">Phone</span>
                  <span className="info-value">{user.phone || 'N/A'}</span>
                </li>
                <li className="info-item">
                  <span className="info-label">Address</span>
                  <span className="info-value">{user.address || 'N/A'}</span>
                </li>
              </ul>
            </div>
            
            <div className="info-card">
              <h3 className="info-card-title">
                <FontAwesomeIcon icon={faBriefcase} /> Account Details
              </h3>
              
              <ul className="info-list">
                <li className="info-item">
                  <span className="info-label">Account Type</span>
                  <span className="info-value">{user.accountType || 'Standard'}</span>
                </li>
                <li className="info-item">
                  <span className="info-label">Role</span>
                  <span className="info-value">{user.role}</span>
                </li>
                <li className="info-item">
                  <span className="info-label">Joined Date</span>
                  <span className="info-value">{formatDate(user.createdAt || new Date())}</span>
                </li>
                <li className="info-item">
                  <span className="info-label">Verification Status</span>
                  <span className="info-value">
                    <span className="badge">{user.verificationStatus || 'Pending'}</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}
        
        {/* Recent Shipments */}
        <div className="orders-section">
          <div className="orders-header">
            <h3 className="orders-title">
              <FontAwesomeIcon icon={faBoxOpen} /> Recent Shipments
            </h3>
          </div>
          
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Tracking #</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentShipments.length > 0 ? (
                recentShipments.map((shipment) => (
                  <tr key={shipment.id}>
                    <td>#{shipment.id}</td>
                    <td>{formatDate(shipment.createdAt)}</td>
                    <td>{shipment.customerName}</td>
                    <td>${shipment.amount.toFixed(2)}</td>
                    <td>
                      <span className={`transaction-status ${shipment.status}`}>
                        {shipment.status.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <button
                        className="view-btn"
                        onClick={() => window.location.href = `/shipments/${shipment.id}`}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                    No recent shipments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
          <button
            className="view-all-btn"
            onClick={() => window.location.href = '/shipments'}
          >
            View All Shipments
          </button>
        </div>
      </div>
    </SellerLayout>
  );
};

export default Profile;