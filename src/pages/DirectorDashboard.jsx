import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const DirectorDashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white">
      <header className="bg-[#0A0F1C]/80 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
            FilmConnect
          </h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {currentUser?.photoURL ? (
                <img 
                  src={currentUser.photoURL} 
                  alt={currentUser.fullName} 
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold">
                    {currentUser?.fullName?.charAt(0) || 'D'}
                  </span>
                </div>
              )}
              <span className="font-medium">{currentUser?.fullName || 'Director'}</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h2 className="text-2xl font-bold mb-4">Welcome to your Director Dashboard</h2>
          <p className="text-gray-300 mb-6">
            This is a placeholder for the director dashboard. In a real application, this would display:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Your profile information</li>
            <li>Active casting calls</li>
            <li>Messages from actors</li>
            <li>Your projects and productions</li>
            <li>Upcoming auditions and callbacks</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default DirectorDashboard;
