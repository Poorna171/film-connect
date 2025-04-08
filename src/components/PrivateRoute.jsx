import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children, userType }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // Redirect to login if not authenticated
    return <Navigate to="/" />;
  }

  // Only check userType if it's provided
  if (userType && currentUser.userType !== userType) {
    // Redirect to appropriate dashboard if wrong role
    return <Navigate to={`/${userType}-dashboard`} />;
  }

  return children;
};

export default PrivateRoute; 