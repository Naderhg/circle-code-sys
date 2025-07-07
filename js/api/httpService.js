/**
 * HTTP Service
 * Handles all API requests with authentication and error handling
 */
import API_CONFIG from './config.js';

class HttpService {
    constructor() {
        // Flag to indicate if we're in development mode
        this.devMode = true; // Set to true during development
    }

    /**
     * Sends HTTP requests to the API
     * @param {string} endpoint - API endpoint
     * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
     * @param {object} data - Request payload
     * @param {boolean} requiresAuth - Whether the request requires authentication
     * @returns {Promise} - Response promise
     */
    async sendRequest(endpoint, method = 'GET', data = null, requiresAuth = true) {
        const url = `${API_CONFIG.BASE_URL}${endpoint}`;
        
        // Prepare request options
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include' // Include cookies for CORS requests
        };
        
        // Add authentication token if required
        if (requiresAuth) {
            const token = localStorage.getItem('access_token');
            if (!token) {
                // In development mode, create a temporary token instead of redirecting
                if (this.devMode) {
                    console.log('Development mode: Creating temporary auth token');
                    const tempToken = 'dev_temp_token_' + Date.now();
                    localStorage.setItem('access_token', tempToken);
                    options.headers['Authorization'] = `Bearer ${tempToken}`;
                } else {
                    // Only redirect in production mode
                    window.location.href = '/Login/index.html';
                    return Promise.reject(new Error('Authentication required'));
                }
            } else {
                options.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        
        // Add request body for non-GET requests
        if (data && method !== 'GET') {
            options.body = JSON.stringify(data);
        }
        
        // Add query parameters for GET requests
        if (data && method === 'GET') {
            const params = new URLSearchParams();
            Object.entries(data).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    params.append(key, value);
                }
            });
            url += `?${params.toString()}`;
        }
        
        try {
            // Show loading indicator
            this.showLoader();
            
            // In development mode, simulate successful response for certain endpoints
            if (this.devMode && (endpoint.includes('/shipments') || endpoint.includes('/stats'))) {
                console.log('Development mode: Simulating API response for', endpoint);
                return this.getMockResponse(endpoint, method, data);
            }
            
            // Send the request
            const response = await fetch(url, options);
            
            // Handle token expiration
            if (response.status === 401) {
                // In development mode, create a new token instead of redirecting
                if (this.devMode) {
                    console.log('Development mode: Refreshing temporary auth token');
                    const tempToken = 'dev_temp_token_' + Date.now();
                    localStorage.setItem('access_token', tempToken);
                    return this.sendRequest(endpoint, method, data, requiresAuth);
                }
                
                // Try to refresh the token
                const refreshed = await this.refreshToken();
                if (refreshed) {
                    // Retry the original request with the new token
                    return this.sendRequest(endpoint, method, data, requiresAuth);
                } else {
                    // Redirect to login if token refresh failed
                    window.location.href = '/Login/index.html';
                    return Promise.reject(new Error('Session expired'));
                }
            }
            
            // Parse response
            const responseData = await response.json();
            
            // Handle API errors
            if (!response.ok) {
                throw new Error(responseData.message || 'An error occurred');
            }
            
            return responseData;
        } catch (error) {
            // In development mode, return mock data instead of showing error
            if (this.devMode && (endpoint.includes('/shipments') || endpoint.includes('/stats'))) {
                console.log('Development mode: API error occurred, returning mock data', error);
                return this.getMockResponse(endpoint, method, data);
            }
            
            this.handleError(error);
            return Promise.reject(error);
        } finally {
            // Hide loading indicator
            this.hideLoader();
        }
    }
    
    /**
     * Generate mock responses for development
     */
    getMockResponse(endpoint, method, data) {
        // Simulate network delay
        return new Promise(resolve => {
            setTimeout(() => {
                if (endpoint.includes('/stats')) {
                    resolve({
                        totalShipments: 243,
                        inTransit: 56,
                        deliveredToday: 18
                    });
                } else if (endpoint === '/shipments') {
                    resolve({
                        data: this.generateMockShipments(10),
                        page: data?.page || 1,
                        pageSize: data?.pageSize || 10,
                        total: 243
                    });
                } else if (endpoint.includes('/shipments/')) {
                    if (method === 'DELETE') {
                        resolve({ success: true, message: 'Shipment deleted successfully' });
                    } else {
                        const shipmentId = endpoint.split('/').pop();
                        const mockShipment = this.generateMockShipments(1)[0];
                        mockShipment.id = shipmentId;
                        resolve(mockShipment);
                    }
                } else {
                    resolve({ success: true });
                }
            }, 300);
        });
    }
    
    /**
     * Generate mock shipments for development
     */
    generateMockShipments(count) {
        const statuses = ['NEW', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED', 'RETURNED'];
        const merchants = [
            { id: '1', name: 'Cairo Electronics' },
            { id: '2', name: 'Alexandria Traders' },
            { id: '3', name: 'Giza Market' }
        ];
        const agents = [
            { id: '1', name: 'Ahmed Hassan' },
            { id: '2', name: 'Mohamed Ali' },
            { id: '3', name: 'Sara Ahmed' }
        ];
        
        return Array.from({ length: count }, (_, i) => {
            const id = `SHP${String(i + 1).padStart(5, '0')}`;
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            const merchant = merchants[Math.floor(Math.random() * merchants.length)];
            const agent = agents[Math.floor(Math.random() * agents.length)];
            const amount = Math.floor(Math.random() * 10000) / 100;
            
            return {
                id,
                trackingNumber: id,
                customerName: `Customer ${i + 1}`,
                customerPhone: `+201${Math.floor(Math.random() * 10000000000)}`,
                customerEmail: `customer${i + 1}@example.com`,
                customerAddress: `Address ${i + 1}, Cairo, Egypt`,
                merchantId: merchant.id,
                merchant,
                agentId: agent.id,
                agent,
                paymentDetails: {
                    amount,
                    currency: 'USD',
                    method: 'CASH',
                    collectionStatus: 'PENDING'
                },
                dates: {
                    created: new Date().toISOString()
                },
                status
            };
        });
    }
    
    /**
     * GET request helper
     * @param {string} endpoint - API endpoint
     * @param {object} params - Query parameters
     * @param {boolean} requiresAuth - Whether authentication is required
     * @returns {Promise} - Response promise
     */
    get(endpoint, params = null, requiresAuth = true) {
        return this.sendRequest(endpoint, 'GET', params, requiresAuth);
    }
    
    /**
     * POST request helper
     * @param {string} endpoint - API endpoint
     * @param {object} data - Request payload
     * @param {boolean} requiresAuth - Whether authentication is required
     * @returns {Promise} - Response promise
     */
    post(endpoint, data, requiresAuth = true) {
        return this.sendRequest(endpoint, 'POST', data, requiresAuth);
    }
    
    /**
     * PUT request helper
     * @param {string} endpoint - API endpoint
     * @param {object} data - Request payload
     * @param {boolean} requiresAuth - Whether authentication is required
     * @returns {Promise} - Response promise
     */
    put(endpoint, data, requiresAuth = true) {
        return this.sendRequest(endpoint, 'PUT', data, requiresAuth);
    }
    
    /**
     * DELETE request helper
     * @param {string} endpoint - API endpoint
     * @param {boolean} requiresAuth - Whether authentication is required
     * @returns {Promise} - Response promise
     */
    delete(endpoint, requiresAuth = true) {
        return this.sendRequest(endpoint, 'DELETE', null, requiresAuth);
    }
    
    /**
     * Attempts to refresh the authentication token
     * @returns {boolean} - Whether the token was successfully refreshed
     */
    async refreshToken() {
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (!refreshToken) {
                return false;
            }
            
            const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.AUTH.REFRESH_TOKEN}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ refreshToken })
            });
            
            if (!response.ok) {
                return false;
            }
            
            const data = await response.json();
            localStorage.setItem('access_token', data.accessToken);
            localStorage.setItem('refresh_token', data.refreshToken);
            
            return true;
        } catch (error) {
            console.error('Token refresh failed:', error);
            return false;
        }
    }
    
    /**
     * Handles API errors
     * @param {Error} error - The error that occurred
     */
    handleError(error) {
        console.error('API Error:', error);
        
        // Display user-friendly error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-toast';
        errorMessage.textContent = error.message || 'An error occurred while processing your request';
        document.body.appendChild(errorMessage);
        
        // Remove error message after 5 seconds
        setTimeout(() => {
            errorMessage.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(errorMessage);
            }, 500);
        }, 5000);
    }
    
    /**
     * Shows a loading indicator
     */
    showLoader() {
        // Check if loader already exists
        let loader = document.querySelector('.api-loader');
        if (!loader) {
            loader = document.createElement('div');
            loader.className = 'api-loader';
            loader.innerHTML = '<div class="spinner"></div>';
            document.body.appendChild(loader);
        }
        
        // Make loader visible
        loader.style.display = 'flex';
    }
    
    /**
     * Hides the loading indicator
     */
    hideLoader() {
        const loader = document.querySelector('.api-loader');
        if (loader) {
            loader.style.display = 'none';
        }
    }
}

// Create and export singleton instance
const httpService = new HttpService();
export default httpService; 