// src/components/shipment/ShipmentFilters.jsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const ShipmentFilters = ({ onApplyFilters, initialFilters = {} }) => {
  const [filters, setFilters] = useState({
    status: initialFilters.status || '',
    dateFrom: initialFilters.dateFrom || '',
    dateTo: initialFilters.dateTo || '',
    search: initialFilters.search || ''
  });
  
  useEffect(() => {
    // Update filters if initialFilters change
    setFilters({
      status: initialFilters.status || filters.status,
      dateFrom: initialFilters.dateFrom || filters.dateFrom,
      dateTo: initialFilters.dateTo || filters.dateTo,
      search: initialFilters.search || filters.search
    });
  }, [initialFilters]);
  
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [id.replace('-filter', '').replace('-', '')]: value
    }));
  };
  
  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };
  
  const handleResetFilters = () => {
    const resetFilters = {
      status: '',
      dateFrom: '',
      dateTo: '',
      search: ''
    };
    setFilters(resetFilters);
    onApplyFilters(resetFilters);
  };
  
  return (
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
  );
};

export default ShipmentFilters;
