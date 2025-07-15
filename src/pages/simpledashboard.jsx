import React, { useState, useEffect } from 'react';

// Mock data for the dashboard
const mockStats = {
  totalShipments: 245,
  inTransit: 18,
  earnings: 4830
};

const mockShipments = [
  {
    id: 'SHP-089',
    customerName: 'Emma Johnson',
    status: 'pending',
    amount: 87.50
  },
  {
    id: 'SHP-088',
    customerName: 'Michael Brown',
    status: 'in-transit',
    amount: 124.99
  },
  {
    id: 'SHP-087',
    customerName: 'Sarah Wilson',
    status: 'delivered',
    amount: 56.25
  }
];

const SimpleDashboard = () => {
  const [stats, setStats] = useState(mockStats);
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      try {
        // Using setTimeout to simulate network request
        await new Promise(resolve => setTimeout(resolve, 500));
        setShipments(mockShipments);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Simple status badge component
  const StatusBadge = ({ status }) => {
    const getStatusClass = () => {
      switch(status.toLowerCase()) {
        case 'pending': return 'bg-yellow-100 text-yellow-800';
        case 'in-transit': return 'bg-blue-100 text-blue-800';
        case 'delivered': return 'bg-green-100 text-green-800';
        case 'returned': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusClass()}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Seller Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-gray-500 text-sm">Total Shipments</h3>
          <p className="text-2xl font-bold">{stats.totalShipments}</p>
          <p className="text-gray-400 text-xs">All time shipments</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-gray-500 text-sm">In Transit</h3>
          <p className="text-2xl font-bold">{stats.inTransit}</p>
          <p className="text-gray-400 text-xs">Currently in transit</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-gray-500 text-sm">Earnings</h3>
          <p className="text-2xl font-bold">${stats.earnings}</p>
          <p className="text-gray-400 text-xs">Total collected</p>
        </div>
      </div>
      
      {/* Recent Shipments */}
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Shipments</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
            Create Shipment
          </button>
        </div>
        
        {loading ? (
          <p className="text-center py-4">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tracking ID
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {shipments.map((shipment) => (
                  <tr key={shipment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{shipment.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {shipment.customerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <StatusBadge status={shipment.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${shipment.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-800 mr-2">View</button>
                      <button className="text-green-600 hover:text-green-800">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleDashboard; 