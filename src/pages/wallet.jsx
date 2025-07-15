// src/pages/Wallet.jsx
import React, { useEffect, useState } from 'react';
import SellerLayout from '../components/layout/SellerLayout';
import { getShipmentStats } from '../services/shipmentService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

const Wallet = () => {
  const [stats, setStats] = useState({
    totalEarnings: 0,
    inTransitEarnings: 0,
    deliveredEarnings: 0,
    returnedEarnings: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        setLoading(true);
        const response = await getShipmentStats();
        setStats({
          totalEarnings: response.data.totalEarnings || 0,
          inTransitEarnings: response.data.inTransitEarnings || 0,
          deliveredEarnings: response.data.deliveredEarnings || 0,
          returnedEarnings: response.data.returnedEarnings || 0
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWalletData();
  }, []);

  return (
    <SellerLayout>
      <h2>Wallet</h2>
      <div className="wallet-container">
        <div className="stat-card">
          <h3>Total Earnings</h3>
          <h2>{`$${stats.totalEarnings.toFixed(2)}`}</h2>
          <p>All time collected</p>
        </div>
        <div className="stat-card">
          <h3>In Transit Earnings</h3>
          <h2>{`$${stats.inTransitEarnings.toFixed(2)}`}</h2>
          <p>Currently in transit</p>
        </div>
        <div className="stat-card">
          <h3>Delivered Earnings</h3>
          <h2>{`$${stats.deliveredEarnings.toFixed(2)}`}</h2>
          <p>Completed deliveries</p>
        </div>
        <div className="stat-card">
          <h3>Returned Earnings</h3>
          <h2>{`$${stats.returnedEarnings.toFixed(2)}`}</h2>
          <p>Returns processed</p>
        </div>
      </div>
    </SellerLayout>
  );
};

export default Wallet;