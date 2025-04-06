// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Roleselector from './components/Roleselector';
import ActorLogin from './pages/ActorLogin';
import DirectorLogin from './pages/DirectorLogin';
import ActorSignup from './pages/ActorSignup';
import DirectorSignup from './pages/DirectorSignup';
import ActorDashboard from './pages/ActorDashboard';
import DirectorDashboard from './pages/DirectorDashboard';
import PrivateRoute from './components/PrivateRoute';

// Main App component
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#0A0F1C]">
          <Routes>
            <Route path="/" element={<Roleselector />} />
            <Route path="/login/actor" element={<ActorLogin />} />
            <Route path="/login/director" element={<DirectorLogin />} />
            <Route path="/signup/actor" element={<ActorSignup />} />
            <Route path="/signup/director" element={<DirectorSignup />} />
            <Route 
              path="/actor-dashboard" 
              element={
                <PrivateRoute userType="actor">
                  <ActorDashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/director-dashboard" 
              element={
                <PrivateRoute userType="director">
                  <DirectorDashboard />
                </PrivateRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
