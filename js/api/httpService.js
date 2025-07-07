/**
 * HTTP Service
 * Handles all API requests with authentication and error handling
 */
import API_CONFIG from './config.js';

class HttpService {
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
                // Redirect to login if no token is available
                window.location.href = '/Login/index.html';
                return Promise.reject(new Error('Authentication required'));
            }
            options.headers['Authorization'] = `Bearer ${token}`;
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
            
            // Send the request
            const response = await fetch(url, options);
            
            // Handle token expiration
            if (response.status === 401) {
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
            this.handleError(error);
            return Promise.reject(error);
        } finally {
            // Hide loading indicator
            this.hideLoader();
        }
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