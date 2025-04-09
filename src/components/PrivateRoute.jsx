import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children, userType }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    // Redirect to login with the return URL
    return <Navigate to={`/login/${userType || 'actor'}`} state={{ from: location }} replace />;
  }

  // If userType is specified, check if the user has the correct role
  if (userType && currentUser.userType !== userType) {
    // Redirect to the appropriate dashboard based on their actual role
    return <Navigate to={`/${currentUser.userType}`} replace />;
  }

  return children;
};

export default PrivateRoute; 