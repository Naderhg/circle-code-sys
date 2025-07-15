// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SellerLayout from '../components/Layout/sellerLayout';
import StatCard from '../components/common/statcard';
import DataTable from '../components/common/datatable';
import { getShipmentStats, getShipments } from '../services/shipmentservice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBox, 
  faTruck, 
  faDollarSign, 
  faChartLine, 
  faEye, 
  faEdit,
  faFileExport,
  faPrint,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalShipments: 0,
    inTransit: 0,
    earnings: 0
  });
  const [recentShipments, setRecentShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Fetch shipment statistics
        const statsResponse = await getShipmentStats();
        
        // Fetch recent shipments (limit to 5)
        const shipmentsResponse = await getShipments(1, 3);
        
        // Update state with fetched data
        setStats({
          totalShipments: statsResponse.data.totalShipments || 0,
          inTransit: statsResponse.data.inTransitShipments || 0,
          earnings: statsResponse.data.totalEarnings || 0
        });
        
        setRecentShipments(shipmentsResponse.data.items || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  // Define columns for the shipments table
  const shipmentColumns = [
    { 
      header: 'Tracking ID', 
      accessor: 'id',
      render: (value) => `#${value}`
    },
    { 
      header: 'Customer', 
      accessor: 'customerName' 
    },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (value) => (
        <span className={`status ${value.toLowerCase()}`}>
          {value.toUpperCase()}
        </span>
      )
    },
    { 
      header: 'Amount', 
      accessor: 'amount',
      render: (value) => `$${value.toFixed(2)}`
    },
    {
      header: 'Actions',
      accessor: 'actions',
      render: (_, shipment) => (
        <div className="action-buttons">
          <button 
            className="action-btn" 
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/shipments/${shipment.id}`);
            }}
          >
            <FontAwesomeIcon icon={faEye} />
          </button>
          <button 
            className="action-btn" 
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/edit/${shipment.id}`);
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </div>
      )
    }
  ];

  return (
    <SellerLayout>
      {/* Stats Cards */}
      <div className="stats-container">
        <StatCard 
          title="Total Shipments"
          value={stats.totalShipments}
          description="All time shipments"
          icon={faBox}
          onClick={() => navigate('/shipments')}
        />
        <StatCard 
          title="In Transit"
          value={stats.inTransit}
          description="Currently in transit"
          icon={faTruck}
          onClick={() => navigate('/shipments?status=in-transit')}
        />
        <StatCard 
          title="Earnings"
          value={`$${stats.earnings.toFixed(2)}`}
          description="Total collected"
          icon={faDollarSign}
          onClick={() => navigate('/wallet')}
        />
      </div>
      
      {/* Sales Analytics Panel */}
      <div className="merchant-management">
        <div className="panel-header">
          <h3>Sales Analytics</h3>
          <div className="action-buttons">
            <button className="export-btn">
              <FontAwesomeIcon icon={faFileExport} /> Export
            </button>
            <button className="print-btn">
              <FontAwesomeIcon icon={faPrint} /> Print
            </button>
          </div>
        </div>
        
        <div className="activity-chart">
          <div className="chart-placeholder">
            <FontAwesomeIcon icon={faChartLine} />
            <p>Sales analytics will be displayed here</p>
          </div>
        </div>
      </div>
      
      {/* Recent Shipments Panel */}
      <div className="merchant-management" style={{ marginTop: "20px" }}>
        <div className="panel-header">
          <h3>Recent Shipments</h3>
          <div className="action-buttons">
            <button 
              className="add-merchant-btn" 
              onClick={() => navigate('/create')}
            >
              <FontAwesomeIcon icon={faPlus} /> Create Shipment
            </button>
          </div>
        </div>
        
        <DataTable 
          columns={shipmentColumns}
          data={recentShipments}
          loading={loading}
          onRowClick={(shipment) => navigate(`/shipments/${shipment.id}`)}
          emptyMessage="No recent shipments found"
        />
      </div>
    </SellerLayout>
  );
};

export default Dashboard;