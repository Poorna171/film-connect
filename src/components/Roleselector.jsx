// src/components/Roleselector.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaFilm } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const Roleselector = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // If user is already authenticated, redirect to their dashboard
  React.useEffect(() => {
    if (currentUser) {
      navigate(`/${currentUser.userType}`);
    }
  }, [currentUser, navigate]);

  const handleRoleSelect = (role) => {
    // Direct to signup page instead of login
    navigate(`/signup/${role}`);
  };

  if (currentUser) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-blue-600">
              Welcome to Film Connect
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Choose your role to continue
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            onClick={() => handleRoleSelect('actor')}
          >
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-fuchsia-500/20 to-blue-600/20 flex items-center justify-center mb-6">
                <FaUser className="w-10 h-10 text-fuchsia-400" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Actor</h2>
              <p className="text-gray-400 text-center mb-6">
                Find casting opportunities, connect with directors, and showcase your talent
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-fuchsia-500 to-blue-600 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Sign Up as Actor
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
            onClick={() => handleRoleSelect('director')}
          >
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-fuchsia-500/20 to-blue-600/20 flex items-center justify-center mb-6">
                <FaFilm className="w-10 h-10 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Director</h2>
              <p className="text-gray-400 text-center mb-6">
                Post roles, find talented actors, and manage your film projects
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-fuchsia-500 to-blue-600 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Sign Up as Director
              </motion.button>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400">
            Already have an account?{' '}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login/actor')}
              className="text-fuchsia-400 hover:text-fuchsia-300 transition-colors font-medium"
            >
              Sign In
            </motion.button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Roleselector;
