// Mock user data
const mockUser = { 
  id: 1, 
  name: "Seller Account", 
  email: "seller@example.com", 
  role: "seller" 
};

export const loginUser = async (email, password) => {
  // Simulate async behavior
  await new Promise(resolve => setTimeout(resolve, 800));
  
  try {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    
    // In a real implementation, this would validate credentials against an API
    // Simple mock validation - accept any non-empty values
    const access_token = "mock_access_token";
    const refresh_token = "mock_refresh_token";
    const user = { 
      ...mockUser,
      email: email || mockUser.email
    };
    
    // Store tokens in localStorage for session management
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    
    return user;
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Login failed. Please check your credentials.');
  }
};

export const logoutUser = async () => {
  // Simulate async behavior
  await new Promise(resolve => setTimeout(resolve, 300));
  
  try {
    // Just clear local storage in the mock implementation
    console.log('User logged out');
  } finally {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
};

export const refreshToken = async () => {
  // Simulate async behavior
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const refresh_token = localStorage.getItem('refresh_token');
  if (!refresh_token) return null;
  
  try {
    // Mock implementation - always return a new token
    const access_token = "new_mock_access_token_" + Date.now();
    localStorage.setItem('access_token', access_token);
    return access_token;
  } catch (error) {
    console.error('Token refresh failed:', error);
    return null;
  }
};

export const getCurrentUser = async () => {
  // Simulate async behavior
  await new Promise(resolve => setTimeout(resolve, 400));
  
  try {
    // Check if user is logged in by checking token
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('User not authenticated');
    }
    
    // Return mock user data
    return mockUser;
  } catch (error) {
    console.error('Failed to get current user:', error);
    throw error;
  }
};
