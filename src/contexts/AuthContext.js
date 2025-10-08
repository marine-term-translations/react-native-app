import React, { createContext, useState, useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { getCurrentUser } from '../services/apiService';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load saved token on app start
    loadToken();
  }, []);

  const loadToken = async () => {
    try {
      const savedToken = await SecureStore.getItemAsync('github_token');
      if (savedToken) {
        setToken(savedToken);
        // Fetch user info
        try {
          const userData = await getCurrentUser(savedToken);
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user:', error);
          // Token might be invalid, clear it
          await logout();
        }
      }
    } catch (error) {
      console.error('Error loading token:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (githubToken, userData) => {
    try {
      await SecureStore.setItemAsync('github_token', githubToken);
      setToken(githubToken);
      setUser(userData);
    } catch (error) {
      console.error('Error saving token:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('github_token');
      await SecureStore.deleteItemAsync('selected_branch');
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
