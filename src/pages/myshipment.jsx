// src/pages/MyShipments.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SellerLayout from '../components/Layout/sellerLayout';
import DataTable from '../components/common/datatable';
import Pagination from '../components/common/Pagination';
import { getShipments, exportShipments } from '../services/shipmentservice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFileExport, 
  faPrint, 
  faPlus, 
  faEye, 
  faEdit,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import '../assets/styles/shipments.css';

const MyShipments = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 1
  });
  const [filters, setFilters] = useState({
    status: '',
    dateFrom: '',
    dateTo: '',
    search: ''
  });
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // Parse URL search params on component mount
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    
    const initialFilters = {
      status: queryParams.get('status') || '',
      dateFrom: queryParams.get('date_from') || '',
      dateTo: queryParams.get('date_to') || '',
      search: queryParams.get('search') || ''
    };
    
    const page = parseInt(queryParams.get('page') || '1', 10);
    
    setFilters(initialFilters);
    setPagination(prev => ({ ...prev, currentPage: page }));
    
    // Initial shipments fetch
    fetchShipments(page, pagination.pageSize, initialFilters);
  }, [location.search]);
  
  const fetchShipments = async (page, pageSize, filterParams) => {
    try {
      setLoading(true);
      
      // Prepare API filter parameters
      const apiFilters = {
        status: filterParams.status || undefined,
        startDate: filterParams.dateFrom || undefined,
        endDate: filterParams.dateTo || undefined,
        search: filterParams.search || undefined
      };
      
      const response = await getShipments(page, pageSize, apiFilters);
      
      setShipments(response.data.items || []);
      setPagination({
        currentPage: response.data.currentPage || page,
        pageSize: response.data.pageSize || pageSize,
        totalItems: response.data.totalItems || 0,
        totalPages: response.data.totalPages || 1
      });
    } catch (error) {
      console.error('Error fetching shipments:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handlePageChange = (newPage) => {
    // Build new URL with updated page parameter
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('page', newPage);
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };
  
  const handleApplyFilters = (e) => {
    e.preventDefault();
    // Build new URL with filters
    const queryParams = new URLSearchParams();
    
    if (filters.status) queryParams.set('status', filters.status);
    if (filters.dateFrom) queryParams.set('date_from', filters.dateFrom);
    if (filters.dateTo) queryParams.set('date_to', filters.dateTo);
    if (filters.search) queryParams.set('search', filters.search);
    
    // Reset to page 1 when applying filters
    queryParams.set('page', '1');
    
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  const handleResetFilters = () => {
    setFilters({
      status: '',
      dateFrom: '',
      dateTo: '',
      search: ''
    });
    navigate(location.pathname);
  };
  
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [id.replace('-filter', '').replace('-', '')]: value
    }));
  };
  
  const handleExportShipments = async () => {
    try {
      const exportFilters = {
        status: filters.status || undefined,
        startDate: filters.dateFrom || undefined,
        endDate: filters.dateTo || undefined,
        search: filters.search || undefined
      };
      
      await exportShipments(exportFilters);
    } catch (error) {
      console.error('Error exporting shipments:', error);
    }
  };
  
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
      header: 'Date', 
      accessor: 'createdAt',
      render: (value) => new Date(value).toLocaleDateString()
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
          <button 
            className="action-btn" 
            onClick={(e) => {
              e.stopPropagation();
              // Print shipment label
              console.log('Print shipment', shipment.id);
            }}
          >
            <FontAwesomeIcon icon={faPrint} />
          </button>
        </div>
      )
    }
  ];
  
  return (
    <SellerLayout>
      {/* Filter Panel */}
      <div className="filter-panel">
        <div className="filter-item">
          <label htmlFor="status-filter">Status</label>
          <select 
            id="status-filter" 
            className="filter-input"
            value={filters.status}
            onChange={handleInputChange}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="returned">Returned</option>
          </select>
        </div>
        
        <div className="filter-item">
          <label htmlFor="date-range">Date Range</label>
          <input 
            type="date" 
            id="date-from" 
            className="filter-input date-input"
            value={filters.dateFrom}
            onChange={handleInputChange}
          />
          <span>to</span>
          <input 
            type="date" 
            id="date-to" 
            className="filter-input date-input"
            value={filters.dateTo}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="filter-item">
          <label htmlFor="search-input">Search</label>
          <div className="search-container">
            <input 
              type="text" 
              id="search-input" 
              placeholder="Search by tracking ID, customer name..." 
              className="filter-input"
              value={filters.search}
              onChange={handleInputChange}
            />
            <button className="search-btn">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
        
        <div className="filter-actions">
          <button 
            className="apply-filter-btn"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </button>
          <button 
            className="reset-filter-btn"
            onClick={handleResetFilters}
          >
            Reset
          </button>
        </div>
      </div>
      
      {/* Shipments Table */}
      <div className="merchant-management">
        <div className="panel-header">
          <h3>Shipment List</h3>
          <div className="action-buttons">
            <button 
              className="export-btn"
              onClick={handleExportShipments}
            >
              <FontAwesomeIcon icon={faFileExport} /> Export
            </button>
            <button className="print-btn">
              <FontAwesomeIcon icon={faPrint} /> Print
            </button>
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
          data={shipments}
          loading={loading}
          onRowClick={(shipment) => navigate(`/shipments/${shipment.id}`)}
          emptyMessage="No shipments found matching the criteria"
        />
        
        {pagination.totalPages > 1 && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </SellerLayout>
  );
};

export default MyShipments;