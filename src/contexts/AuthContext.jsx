import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Sign up with email and password
  const signup = async (email, password, fullName, country, userType) => {
    try {
      setError('');
      setLoading(true);
      
      // In a real app, this would make an API call to your backend
      // For now, we'll simulate a successful signup
      
      // Create a user object
      const user = {
        uid: Date.now().toString(), // Generate a unique ID
        email,
        fullName,
        country,
        userType,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Store user in localStorage for persistence
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
  const login = async (email, password) => {
    try {
      setError('');
      setLoading(true);
      
      // In a real app, this would make an API call to your backend
      // For now, we'll simulate a successful login
      
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
      
      // In a real app, you would verify the password here
      
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
      
      // In a real app, this would handle Google OAuth
      // For now, we'll simulate a successful Google sign-in
      
      // Create a user object with Google-like data
      const user = {
        uid: Date.now().toString(),
        email: 'google-user@example.com',
        fullName: 'Google User',
        photoURL: 'https://via.placeholder.com/150',
        userType,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // Store user in localStorage for persistence
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
      // In a real app, this would fetch user data from your backend
      // For now, we'll return the current user
      return currentUser;
    } catch (error) {
      setError(error.message || 'Failed to get user data');
      throw error;
    }
  };

  // Update user profile
  const updateUserProfile = async (uid, data) => {
    try {
      // In a real app, this would update user data in your backend
      // For now, we'll update the current user
      
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

  // Check if user is logged in on page load
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

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