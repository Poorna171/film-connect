import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children, userType }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (!currentUser) {
    // Redirect to login page based on user type
    return <Navigate to={`/login/${userType}`} />;
  }

  // Check if user has the correct user type
  if (currentUser.userType !== userType) {
    // Redirect to the correct dashboard
    return <Navigate to={`/${currentUser.userType}-dashboard`} />;
  }

  return children;
};

export default PrivateRoute; 