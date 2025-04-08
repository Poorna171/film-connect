import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
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

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-[#0A0F1C] text-white">
          <Routes>
            <Route path="/" element={<Roleselector />} />
            <Route path="/login/:userType" element={<LoginForm />} />
            <Route path="/signup/:userType" element={<SignupForm />} />
            
            {/* Actor Routes */}
            <Route
              path="/actor-dashboard"
              element={
                <PrivateRoute userType="actor">
                  <DashboardLayout userRole="actor">
                    <HomeDashboard userRole="actor" />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/actor/applications"
              element={
                <PrivateRoute userType="actor">
                  <DashboardLayout userRole="actor">
                    <ActorApplications />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/actor/discover"
              element={
                <PrivateRoute userType="actor">
                  <DashboardLayout userRole="actor">
                    <DiscoverPage userRole="actor" />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/actor/notifications"
              element={
                <PrivateRoute userType="actor">
                  <DashboardLayout userRole="actor">
                    <NotificationsPage userType="actor" />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/actor/messages"
              element={
                <PrivateRoute userType="actor">
                  <DashboardLayout userRole="actor">
                    <MessagesPage userRole="actor" />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />
            <Route path="/actor/profile" element={<PrivateRoute role="actor"><DashboardLayout><ProfilePage /></DashboardLayout></PrivateRoute>} />
            
            {/* Director Routes */}
            <Route
              path="/director-dashboard"
              element={
                <PrivateRoute userType="director">
                  <DashboardLayout userRole="director">
                    <HomeDashboard userRole="director" />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/director/roles"
              element={
                <PrivateRoute userType="director">
                  <DashboardLayout userRole="director">
                    <DirectorRoles />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/director/discover"
              element={
                <PrivateRoute userType="director">
                  <DashboardLayout userRole="director">
                    <DiscoverPage userRole="director" />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/director/notifications"
              element={
                <PrivateRoute userType="director">
                  <DashboardLayout userRole="director">
                    <NotificationsPage userType="director" />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/director/messages"
              element={
                <PrivateRoute userType="director">
                  <DashboardLayout userRole="director">
                    <MessagesPage userRole="director" />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />
            <Route path="/director/profile" element={<PrivateRoute role="director"><DashboardLayout><ProfilePage /></DashboardLayout></PrivateRoute>} />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App; 