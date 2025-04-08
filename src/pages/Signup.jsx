import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import SignupForm from '../components/SignupForm';
import { motion } from 'framer-motion';
import { FaFilm } from 'react-icons/fa';
import GridBackground from '../components/GridBackground';

const Signup = () => {
  const { userType } = useParams();

  // If no userType is specified, redirect to role selector
  if (!userType) {
    return <Navigate to="/role-selector" />;
  }

  // If invalid userType, redirect to role selector
  if (userType !== 'actor' && userType !== 'director') {
    return <Navigate to="/role-selector" />;
  }

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#0A0F1C] to-[#0A0F1C]" />
        <GridBackground />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4"
          >
            <FaFilm className="w-16 h-16 mx-auto text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-blue-600" />
          </motion.div>
          <h1 className="text-4xl font-black mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-blue-600">
              Film Connect
            </span>
          </h1>
          <p className="text-gray-400">
            {userType === 'actor' ? 'Actor Signup' : 'Director Signup'}
          </p>
        </motion.div>

        <SignupForm userType={userType} />
      </div>
    </div>
  );
};

export default Signup; 