import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Initialize user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Sign up with email and password
  const signup = async (email, password, userType, userData = {}) => {
    try {
      setError('');
      setLoading(true);
      
      // Create a user object
      const user = {
        uid: Date.now().toString(),
        email,
        userType,
        ...userData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      
      // Set current user
      setCurrentUser(user);
      
      return { user };
    } catch (error) {
      setError(error.message || 'Failed to create an account');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with email and password
  const login = async (email, password, userType) => {
    try {
      setError('');
      setLoading(true);
      
      // Get user from localStorage
      const storedUser = localStorage.getItem('user');
      
      if (!storedUser) {
        throw new Error('User not found');
      }
      
      const user = JSON.parse(storedUser);
      
      // Check if email matches
      if (user.email !== email) {
        throw new Error('Invalid email or password');
      }
      
      // Check if user type matches
      if (user.userType !== userType) {
        throw new Error(`Invalid user type. Expected ${userType}`);
      }
      
      // Set current user
      setCurrentUser(user);
      
      return { user };
    } catch (error) {
      setError(error.message || 'Failed to sign in');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with Google (simulated)
  const signInWithGoogle = async (userType) => {
    try {
      setError('');
      setLoading(true);
      
      // Create a user object with Google-like data
      const user = {
        uid: Date.now().toString(),
        email: 'google-user@example.com',
        name: 'Google User',
        photoURL: 'https://via.placeholder.com/150',
        userType,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      
      // Set current user
      setCurrentUser(user);
      
      return { user };
    } catch (error) {
      setError(error.message || 'Failed to sign in with Google');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const logout = async () => {
    try {
      setError('');
      
      // Remove user from localStorage
      localStorage.removeItem('user');
      
      // Clear current user
      setCurrentUser(null);
    } catch (error) {
      setError(error.message || 'Failed to sign out');
      throw error;
    }
  };

  // Get user data
  const getUserData = async (uid) => {
    try {
      return currentUser;
    } catch (error) {
      setError(error.message || 'Failed to get user data');
      throw error;
    }
  };

  // Update user profile
  const updateUserProfile = async (uid, data) => {
    try {
      const updatedUser = {
        ...currentUser,
        ...data,
        updatedAt: new Date().toISOString()
      };
      
      // Store updated user in localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Update current user
      setCurrentUser(updatedUser);
    } catch (error) {
      setError(error.message || 'Failed to update profile');
      throw error;
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    signup,
    login,
    logout,
    signInWithGoogle,
    getUserData,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 