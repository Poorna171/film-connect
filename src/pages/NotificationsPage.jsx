import React from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import Notifications from '../components/notifications/Notifications';

const NotificationsPage = () => {
  const { userType } = useParams();
  const userRole = userType || 'actor'; // Default to actor if not specified

  return (
    <DashboardLayout userRole={userRole}>
      <Notifications />
    </DashboardLayout>
  );
};

export default NotificationsPage; 