import React, { useContext } from 'react';
import Sidebar from '../common/sidbar';
import TopBar from '../common/topbar';
import { AuthContext } from '../../context/AuthContext';
//import { Navigate } from 'react-router-dom';

const SellerLayout = ({ children }) => {
  //const { currentUser, loading } = useContext(AuthContext);
  const { loading } = useContext(AuthContext);
  
  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }
  
  //if (!currentUser) {
    //return <Navigate to="/login" replace />;
  //}
  // Authentication check removed
  
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SellerLayout;