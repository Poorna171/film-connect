import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFilm } from 'react-icons/fa';
import GridBackground from '../components/GridBackground';

const NotFound = () => {
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
          className="relative z-10 text-center"
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <FaFilm className="w-24 h-24 mx-auto text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-blue-600" />
          </motion.div>
          
          <h1 className="text-9xl font-black mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-blue-600">
              404
            </span>
          </h1>
          
          <h2 className="text-2xl font-bold mb-6">Page Not Found</h2>
          
          <p className="text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <Link
            to="/"
            className="px-8 py-4 bg-gradient-to-r from-fuchsia-500 to-blue-600 rounded-lg font-bold hover:opacity-90 transition-opacity inline-block"
          >
            Return Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
