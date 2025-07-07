/**
 * API Configuration
 * Central place to configure API endpoints and settings
 */

const API_CONFIG = {
    // Base API URL - change this based on environment
    BASE_URL: 'https://api.circlecode.com/api/v1',
    
    // Authentication endpoints
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        REFRESH_TOKEN: '/auth/refresh',
        FORGOT_PASSWORD: '/auth/forgot-password',
        RESET_PASSWORD: '/auth/reset-password',
        LOGOUT: '/auth/logout'
    },
    
    // Shipment endpoints
    SHIPMENTS: {
        BASE: '/shipments',
        GET_BY_ID: id => `/shipments/${id}`,
        CREATE: '/shipments',
        UPDATE: id => `/shipments/${id}`,
        DELETE: id => `/shipments/${id}`,
        UPDATE_STATUS: (id, status) => `/shipments/${id}/status/${status}`,
        FILTER: '/shipments/filter'
    },
    
    // Merchant endpoints
    MERCHANTS: {
        BASE: '/merchants',
        GET_BY_ID: id => `/merchants/${id}`,
        CREATE: '/merchants',
        UPDATE: id => `/merchants/${id}`,
        DELETE: id => `/merchants/${id}`,
        SHIPMENTS: id => `/merchants/${id}/shipments`
    },
    
    // Agent endpoints
    AGENTS: {
        BASE: '/agents',
        GET_BY_ID: id => `/agents/${id}`,
        CREATE: '/agents',
        UPDATE: id => `/agents/${id}`,
        DELETE: id => `/agents/${id}`,
        SHIPMENTS: id => `/agents/${id}/shipments`,
        BY_ZONE: zoneId => `/agents/zone/${zoneId}`
    },
    
    // Zone endpoints
    ZONES: {
        BASE: '/zones',
        GET_BY_ID: id => `/zones/${id}`,
        CREATE: '/zones',
        UPDATE: id => `/zones/${id}`,
        DELETE: id => `/zones/${id}`,
        AGENTS: id => `/zones/${id}/agents`
    },
    
    // User endpoints
    USERS: {
        BASE: '/users',
        GET_BY_ID: id => `/users/${id}`,
        CREATE: '/users',
        UPDATE: id => `/users/${id}`,
        DELETE: id => `/users/${id}`
    },
    
    // Wallet endpoints
    WALLET: {
        BASE: '/wallet',
        TRANSACTIONS: '/wallet/transactions',
        BALANCE: '/wallet/balance',
        WITHDRAW: '/wallet/withdraw',
        DEPOSIT: '/wallet/deposit'
    },
    
    // Report endpoints
    REPORTS: {
        SHIPMENTS: '/reports/shipments',
        AGENTS: '/reports/agents',
        MERCHANTS: '/reports/merchants',
        FINANCIAL: '/reports/financial'
    },
    
    // Settings endpoints
    SETTINGS: {
        BASE: '/settings',
        UPDATE: '/settings'
    },
    
    // Pagination defaults
    PAGINATION: {
        DEFAULT_PAGE: 1,
        DEFAULT_PAGE_SIZE: 10
    }
};

// Environment-specific configuration
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    API_CONFIG.BASE_URL = 'https://localhost:5001/api/v1';
}

export default API_CONFIG; 