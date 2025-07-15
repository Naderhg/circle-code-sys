import React, { createContext, useState, useEffect } from 'react';
import { loginUser, logoutUser, refreshToken, getCurrentUser } from '../services/authservice';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const initAuth = async () => {
      try {
        //const token = localStorage.getItem('access_token');
        //if (token) {
          //const userData = await getCurrentUser();
          //setCurrentUser(userData);
        //}
        // Automatically set a mock user without checking for token
        const mockUser = { 
          id: 1, 
          name: "Seller Account", 
          email: "seller@example.com", 
          role: "seller" 
        };
        setCurrentUser(mockUser);
      } catch (err) {
        console.error('Auth initialization error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    initAuth();
  }, []);
  
  const login = async (email, password) => {
    setLoading(true);
    try {
      const userData = await loginUser(email, password);
      setCurrentUser(userData);
      setError(null);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  const logout = async () => {
    try {
      await logoutUser();
      setCurrentUser(null);
      localStorage.removeItem('access_token');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };
  
  return (
    <AuthContext.Provider value={{ currentUser, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};