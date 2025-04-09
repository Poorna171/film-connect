import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Roleselector from './components/Roleselector';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import PrivateRoute from './components/PrivateRoute';
import HomeDashboard from './components/HomeDashboard';
import DirectorRoles from './pages/DirectorRoles';
import ActorApplications from './pages/ActorApplications';
import NotificationsPage from './pages/NotificationsPage';
import MessagesPage from './pages/MessagesPage';
import DashboardLayout from './components/DashboardLayout';
import DiscoverPage from './pages/DiscoverPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import EditProfilePage from './pages/EditProfilePage';
import UserProfile from './components/UserProfile';
import EditProfile from './pages/EditProfile';
import Discover from './pages/Discover';
import Settings from './pages/Settings';
import Roles from './pages/Roles';
import Applications from './pages/Applications';
import DirectorApplications from './pages/DirectorApplications';
import ApplyToRole from './pages/ApplyToRole';
import ApplicationDetails from './pages/ApplicationDetails';
import Alerts from './pages/Alerts';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/role-selector" element={<Roleselector />} />
          <Route path="/login/:userType" element={<LoginForm />} />
          <Route path="/signup/:userType" element={<SignupForm />} />
          
          {/* Actor Routes */}
          <Route path="/actor/*" element={
            <PrivateRoute userType="actor">
              <DashboardLayout userRole="actor">
                <Routes>
                  <Route index element={<HomeDashboard userRole="actor" />} />
                  <Route path="dashboard" element={<HomeDashboard userRole="actor" />} />
                  <Route path="roles" element={<Roles />} />
                  <Route path="roles/:roleId/apply" element={<ApplyToRole />} />
                  <Route path="discover" element={<Discover userRole="actor" />} />
                  <Route path="messages" element={<MessagesPage userRole="actor" />} />
                  <Route path="notifications" element={<NotificationsPage userRole="actor" />} />
                  <Route path="profile" element={<UserProfile userRole="actor" isOwnProfile={true} />} />
                  <Route path="edit-profile" element={<EditProfile userRole="actor" />} />
                  <Route path="settings" element={<Settings userRole="actor" />} />
                  <Route path="applications" element={<Applications />} />
                  <Route path="applications/:applicationId" element={<ApplicationDetails />} />
                  <Route path="alerts" element={<Alerts />} />
                </Routes>
              </DashboardLayout>
            </PrivateRoute>
          } />
          
          {/* Director Routes */}
          <Route path="/director/*" element={
            <PrivateRoute userType="director">
              <DashboardLayout userRole="director">
                <Routes>
                  <Route index element={<HomeDashboard userRole="director" />} />
                  <Route path="dashboard" element={<HomeDashboard userRole="director" />} />
                  <Route path="applications" element={<Applications />} />
                  <Route path="discover" element={<Discover userRole="director" />} />
                  <Route path="messages" element={<MessagesPage userRole="director" />} />
                  <Route path="notifications" element={<NotificationsPage userRole="director" />} />
                  <Route path="profile" element={<UserProfile userRole="director" isOwnProfile={true} />} />
                  <Route path="edit-profile" element={<EditProfile userRole="director" />} />
                  <Route path="settings" element={<Settings userRole="director" />} />
                  <Route path="roles" element={<Roles />} />
                  <Route path="applications" element={<DirectorApplications />} />
                  <Route path="alerts" element={<Alerts />} />
                </Routes>
              </DashboardLayout>
            </PrivateRoute>
          } />
          
          {/* Root Route - Redirect based on auth status */}
          <Route path="/" element={<AuthRedirect />} />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

// Helper component to handle root route redirection
const AuthRedirect = () => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    // Redirect to role selector first, which will then direct to signup
    return <Navigate to="/role-selector" replace />;
  }
  
  return <Navigate to={`/${currentUser.userType}`} replace />;
};

export default App; 