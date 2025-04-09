import React from 'react';
import { useLocation } from 'react-router-dom';
import DashboardNavigation from './DashboardNavigation';

const DashboardLayout = ({ userRole, children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white">
      <DashboardNavigation userRole={userRole} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout; 