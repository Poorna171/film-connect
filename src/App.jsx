// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Roleselector from './components/Roleselector';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import ActorDashboard from './pages/ActorDashboard';
import DirectorDashboard from './pages/DirectorDashboard';
import ScriptEditor from './pages/ScriptEditor';
import DirectorMessages from './pages/DirectorMessages';
import PostRole from './pages/PostRole';
import PostedRoles from './pages/PostedRoles';
import HomeDashboard from './components/HomeDashboard';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';

// Main App component
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#0A0F1C]">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/role-selector" element={<Roleselector />} />
            <Route path="/login/:userType" element={<Login />} />
            <Route path="/signup/:userType" element={<Signup />} />

            {/* Protected Actor Routes */}
            <Route 
              path="/actor-dashboard" 
              element={
                <PrivateRoute userType="actor">
                  <HomeDashboard />
                </PrivateRoute>
              } 
            />

            {/* Protected Director Routes */}
            <Route 
              path="/director-dashboard" 
              element={
                <PrivateRoute userType="director">
                  <HomeDashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/director/script/new" 
              element={
                <PrivateRoute userType="director">
                  <ScriptEditor />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/director/script/:scriptId" 
              element={
                <PrivateRoute userType="director">
                  <ScriptEditor />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/director/messages" 
              element={
                <PrivateRoute userType="director">
                  <DirectorMessages />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/director/post-role" 
              element={
                <PrivateRoute userType="director">
                  <PostRole />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/director/roles" 
              element={
                <PrivateRoute userType="director">
                  <PostedRoles />
                </PrivateRoute>
              } 
            />

            {/* Profile Route */}
            <Route 
              path="/profile/:userId" 
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } 
            />

            {/* Unified Dashboard Route */}
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <HomeDashboard />
                </PrivateRoute>
              } 
            />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
