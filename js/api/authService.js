/**
 * Authentication Service
 * Handles user authentication, registration, and token management
 */
import httpService from './httpService.js';
import API_CONFIG from './config.js';

class AuthService {
    /**
     * Login user
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {Promise} - Login result
     */
    async login(email, password) {
        try {
            const response = await httpService.post(API_CONFIG.AUTH.LOGIN, { email, password }, false);
            
            if (response.accessToken) {
                this.setTokens(response.accessToken, response.refreshToken);
                this.setUser(response.user);
                return response.user;
            }
            
            throw new Error('Login failed: No token received');
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }
    
    /**
     * Register a new user
     * @param {object} userData - User registration data
     * @returns {Promise} - Registration result
     */
    async register(userData) {
        try {
            const response = await httpService.post(API_CONFIG.AUTH.REGISTER, userData, false);
            return response;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }
    
    /**
     * Log out current user
     * @returns {Promise} - Logout result
     */
    async logout() {
        try {
            // Call logout endpoint
            await httpService.post(API_CONFIG.AUTH.LOGOUT);
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear local storage regardless of API call result
            this.clearTokens();
            this.clearUser();
            
            // Redirect to login page
            window.location.href = '/Login/index.html';
        }
    }
    
    /**
     * Send password reset request
     * @param {string} email - User email
     * @returns {Promise} - Password reset request result
     */
    async forgotPassword(email) {
        return httpService.post(API_CONFIG.AUTH.FORGOT_PASSWORD, { email }, false);
    }
    
    /**
     * Reset password with token
     * @param {string} token - Password reset token
     * @param {string} newPassword - New password
     * @returns {Promise} - Password reset result
     */
    async resetPassword(token, newPassword) {
        return httpService.post(API_CONFIG.AUTH.RESET_PASSWORD, { token, newPassword }, false);
    }
    
    /**
     * Check if user is authenticated
     * @returns {boolean} - Authentication status
     */
    isAuthenticated() {
        return !!this.getToken();
    }
    
    /**
     * Get current user information
     * @returns {object|null} - User data or null if not authenticated
     */
    getCurrentUser() {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }
    
    /**
     * Get user role
     * @returns {string|null} - User role or null if not authenticated
     */
    getUserRole() {
        const user = this.getCurrentUser();
        return user ? user.role : null;
    }
    
    /**
     * Check if user has a specific role
     * @param {string|Array} roles - Role or array of roles to check
     * @returns {boolean} - Whether user has the role
     */
    hasRole(roles) {
        const userRole = this.getUserRole();
        
        if (!userRole) {
            return false;
        }
        
        if (Array.isArray(roles)) {
            return roles.includes(userRole);
        }
        
        return roles === userRole;
    }
    
    /**
     * Set authentication tokens
     * @param {string} accessToken - JWT access token
     * @param {string} refreshToken - JWT refresh token
     */
    setTokens(accessToken, refreshToken) {
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
    }
    
    /**
     * Get access token
     * @returns {string|null} - JWT access token or null if not found
     */
    getToken() {
        return localStorage.getItem('access_token');
    }
    
    /**
     * Clear authentication tokens
     */
    clearTokens() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }
    
    /**
     * Set user information in local storage
     * @param {object} user - User information
     */
    setUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }
    
    /**
     * Clear user information from local storage
     */
    clearUser() {
        localStorage.removeItem('user');
    }
    
    /**
     * Update user profile in local storage after changes
     * @param {object} userUpdate - Updated user information
     */
    updateUserProfile(userUpdate) {
        const currentUser = this.getCurrentUser();
        if (currentUser) {
            const updatedUser = { ...currentUser, ...userUpdate };
            this.setUser(updatedUser);
            return updatedUser;
        }
        return null;
    }
    
    /**
     * Get JWT payload without verifying the signature
     * @returns {object|null} - JWT payload or null if not valid
     */
    getTokenPayload() {
        const token = this.getToken();
        if (!token) return null;
        
        try {
            // Split the token and get the payload part
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(window.atob(base64));
            
            return payload;
        } catch (e) {
            return null;
        }
    }
    
    /**
     * Check if token is expired
     * @returns {boolean} - Whether token is expired
     */
    isTokenExpired() {
        const payload = this.getTokenPayload();
        if (!payload) return true;
        
        // Check if token has expiration claim
        if (!payload.exp) return false;
        
        // Compare expiration with current time (in seconds)
        const now = Math.floor(Date.now() / 1000);
        return payload.exp < now;
    }
}

// Create and export singleton instance
const authService = new AuthService();
export default authService; 