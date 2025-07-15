// src/pages/Wallet.jsx
import React, { useEffect, useState } from 'react';
import SellerLayout from '../components/Layout/sellerLayout';
import { getShipmentStats, getShipments } from '../services/shipmentservice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faDollarSign, 
  faTruck, 
  faCheckCircle, 
  faUndoAlt, 
  faChartLine, 
  faHistory,
  faSearch,
  faEye
} from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/wallet.css';

const Wallet = () => {
  const [stats, setStats] = useState({
    totalEarnings: 0,
    inTransitEarnings: 0,
    deliveredEarnings: 0,
    returnedEarnings: 0
  });
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartFilter, setChartFilter] = useState('month'); // week, month, year

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        setLoading(true);
        const statsResponse = await getShipmentStats();
        const shipmentsResponse = await getShipments(1, 5);
        
        setStats({
          totalEarnings: statsResponse.data.totalEarnings || 0,
          inTransitEarnings: statsResponse.data.inTransitEarnings || 0,
          deliveredEarnings: statsResponse.data.deliveredEarnings || 0,
          returnedEarnings: statsResponse.data.returnedEarnings || 0
        });
        
        // Set recent transactions from shipments
        setRecentTransactions(shipmentsResponse.data.items || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWalletData();
  }, []);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <SellerLayout>
      <h2>Wallet</h2>
      
      {loading ? (
        <div className="loading-container">Loading wallet data...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="wallet-container">
          {/* Stats Overview */}
          <div className="wallet-overview">
            <div className="stat-card total-earnings">
              <div className="icon">
                <FontAwesomeIcon icon={faDollarSign} />
              </div>
              <h3>Total Earnings</h3>
              <div className="amount">{formatCurrency(stats.totalEarnings)}</div>
              <p>All time collected</p>
            </div>
            
            <div className="stat-card in-transit">
              <div className="icon">
                <FontAwesomeIcon icon={faTruck} />
              </div>
              <h3>In Transit</h3>
              <div className="amount">{formatCurrency(stats.inTransitEarnings)}</div>
              <p>Currently in transit</p>
            </div>
            
            <div className="stat-card delivered">
              <div className="icon">
                <FontAwesomeIcon icon={faCheckCircle} />
              </div>
              <h3>Delivered</h3>
              <div className="amount">{formatCurrency(stats.deliveredEarnings)}</div>
              <p>Completed deliveries</p>
            </div>
            
            <div className="stat-card returned">
              <div className="icon">
                <FontAwesomeIcon icon={faUndoAlt} />
              </div>
              <h3>Returned</h3>
              <div className="amount">{formatCurrency(stats.returnedEarnings)}</div>
              <p>Returns processed</p>
            </div>
          </div>
          
          {/* Charts */}
          <div className="wallet-charts">
            <div className="chart-container">
              <div className="chart-header">
                <div className="chart-title">Earnings Overview</div>
                <div className="chart-filter">
                  <button 
                    className={chartFilter === 'week' ? 'active' : ''}
                    onClick={() => setChartFilter('week')}
                  >
                    Week
                  </button>
                  <button 
                    className={chartFilter === 'month' ? 'active' : ''}
                    onClick={() => setChartFilter('month')}
                  >
                    Month
                  </button>
                  <button 
                    className={chartFilter === 'year' ? 'active' : ''}
                    onClick={() => setChartFilter('year')}
                  >
                    Year
                  </button>
                </div>
              </div>
              
              <div className="chart-placeholder">
                <FontAwesomeIcon icon={faChartLine} />
                <p>Earnings chart will be displayed here.</p>
              </div>
            </div>
            
            <div className="chart-container">
              <div className="chart-header">
                <div className="chart-title">Shipment Analytics</div>
                <div className="chart-filter">
                  <button 
                    className={chartFilter === 'week' ? 'active' : ''}
                    onClick={() => setChartFilter('week')}
                  >
                    Week
                  </button>
                  <button 
                    className={chartFilter === 'month' ? 'active' : ''}
                    onClick={() => setChartFilter('month')}
                  >
                    Month
                  </button>
                  <button 
                    className={chartFilter === 'year' ? 'active' : ''}
                    onClick={() => setChartFilter('year')}
                  >
                    Year
                  </button>
                </div>
              </div>
              
              <div className="chart-placeholder">
                <FontAwesomeIcon icon={faChartLine} />
                <p>Shipment analytics will be displayed here.</p>
              </div>
            </div>
          </div>
          
          {/* Recent Transactions */}
          <div className="transaction-history">
            <div className="transaction-title">
              <FontAwesomeIcon icon={faHistory} /> Recent Transactions
            </div>
            
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Tracking ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.length > 0 ? (
                  recentTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>#{transaction.id}</td>
                      <td>{transaction.customerName}</td>
                      <td>{formatDate(transaction.createdAt)}</td>
                      <td>{formatCurrency(transaction.amount)}</td>
                      <td>
                        <span className={`transaction-status ${transaction.status}`}>
                          {transaction.status.toUpperCase()}
                        </span>
                      </td>
                      <td>
                        <button
                          className="view-btn"
                          onClick={() => window.location.href = `/shipments/${transaction.id}`}
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                      No recent transactions found.
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
      )}
    </SellerLayout>
  );
};

export default Wallet;