/**
 * Shipment Service
 * Handles all shipment-related API operations
 */
import httpService from './httpService.js';
import API_CONFIG from './config.js';

class ShipmentService {
    /**
     * Get all shipments with pagination and filtering
     * @param {number} page - Page number
     * @param {number} pageSize - Number of items per page
     * @param {object} filters - Filter criteria
     * @returns {Promise} - Shipments data with pagination
     */
    async getShipments(page = API_CONFIG.PAGINATION.DEFAULT_PAGE, pageSize = API_CONFIG.PAGINATION.DEFAULT_PAGE_SIZE, filters = {}) {
        const params = {
            page,
            pageSize,
            ...filters
        };
        
        return httpService.get(API_CONFIG.SHIPMENTS.BASE, params);
    }
    
    /**
     * Get a shipment by ID
     * @param {string} id - Shipment ID
     * @returns {Promise} - Shipment details
     */
    async getShipment(id) {
        return httpService.get(API_CONFIG.SHIPMENTS.GET_BY_ID(id));
    }
    
    /**
     * Create a new shipment
     * @param {object} shipmentData - Shipment data
     * @returns {Promise} - Created shipment
     */
    async createShipment(shipmentData) {
        return httpService.post(API_CONFIG.SHIPMENTS.CREATE, shipmentData);
    }
    
    /**
     * Update an existing shipment
     * @param {string} id - Shipment ID
     * @param {object} shipmentData - Updated shipment data
     * @returns {Promise} - Updated shipment
     */
    async updateShipment(id, shipmentData) {
        return httpService.put(API_CONFIG.SHIPMENTS.UPDATE(id), shipmentData);
    }
    
    /**
     * Delete a shipment
     * @param {string} id - Shipment ID
     * @returns {Promise} - Deletion result
     */
    async deleteShipment(id) {
        return httpService.delete(API_CONFIG.SHIPMENTS.DELETE(id));
    }
    
    /**
     * Update shipment status
     * @param {string} id - Shipment ID
     * @param {string} status - New status
     * @returns {Promise} - Updated shipment
     */
    async updateShipmentStatus(id, status) {
        return httpService.put(API_CONFIG.SHIPMENTS.UPDATE_STATUS(id, status), { status });
    }
    
    /**
     * Get shipments by merchant ID
     * @param {string} merchantId - Merchant ID
     * @param {number} page - Page number
     * @param {number} pageSize - Number of items per page
     * @returns {Promise} - Merchant's shipments with pagination
     */
    async getShipmentsByMerchant(merchantId, page = API_CONFIG.PAGINATION.DEFAULT_PAGE, pageSize = API_CONFIG.PAGINATION.DEFAULT_PAGE_SIZE) {
        const params = {
            page,
            pageSize
        };
        
        return httpService.get(API_CONFIG.MERCHANTS.SHIPMENTS(merchantId), params);
    }
    
    /**
     * Get shipments by agent ID
     * @param {string} agentId - Agent ID
     * @param {number} page - Page number
     * @param {number} pageSize - Number of items per page
     * @returns {Promise} - Agent's shipments with pagination
     */
    async getShipmentsByAgent(agentId, page = API_CONFIG.PAGINATION.DEFAULT_PAGE, pageSize = API_CONFIG.PAGINATION.DEFAULT_PAGE_SIZE) {
        const params = {
            page,
            pageSize
        };
        
        return httpService.get(API_CONFIG.AGENTS.SHIPMENTS(agentId), params);
    }
    
    /**
     * Filter shipments by various criteria
     * @param {object} filterOptions - Filter options
     * @param {number} page - Page number
     * @param {number} pageSize - Number of items per page
     * @returns {Promise} - Filtered shipments with pagination
     */
    async filterShipments(filterOptions, page = API_CONFIG.PAGINATION.DEFAULT_PAGE, pageSize = API_CONFIG.PAGINATION.DEFAULT_PAGE_SIZE) {
        const params = {
            page,
            pageSize,
            ...filterOptions
        };
        
        return httpService.get(API_CONFIG.SHIPMENTS.FILTER, params);
    }
    
    /**
     * Get shipment statistics
     * @returns {Promise} - Shipment statistics
     */
    async getShipmentStats() {
        return httpService.get(`${API_CONFIG.SHIPMENTS.BASE}/stats`);
    }
    
    /**
     * Export shipments to CSV/Excel
     * @param {object} filterOptions - Filter options for export
     * @returns {Promise} - Export URL or Blob
     */
    async exportShipments(filterOptions = {}) {
        // Using different approach for file download
        const params = new URLSearchParams(filterOptions);
        const url = `${API_CONFIG.BASE_URL}${API_CONFIG.SHIPMENTS.BASE}/export?${params.toString()}`;
        
        const token = localStorage.getItem('access_token');
        
        // Create a hidden download link
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `shipments_export_${new Date().toISOString().split('T')[0]}.csv`;
        
        // Add authentication header
        fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            a.href = url;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        });
    }
}

// Create and export singleton instance
const shipmentService = new ShipmentService();
export default shipmentService; 