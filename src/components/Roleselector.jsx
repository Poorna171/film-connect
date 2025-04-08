// src/components/Roleselector.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaFilm } from 'react-icons/fa';

const Roleselector = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    navigate(`/signup/${role}`);
  };

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
            Choose your role to get started
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 cursor-pointer"
            onClick={() => handleRoleSelect('actor')}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-fuchsia-500 to-blue-600 rounded-full flex items-center justify-center mb-6">
                <FaUser className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Actor</h2>
              <p className="text-gray-400 mb-6">
                Join as an actor to discover and apply for exciting roles in film and television projects.
              </p>
              <button className="bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white rounded-lg px-8 py-3 font-semibold hover:opacity-90 transition-opacity">
                Join as Actor
              </button>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 cursor-pointer"
            onClick={() => handleRoleSelect('director')}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-fuchsia-500 to-blue-600 rounded-full flex items-center justify-center mb-6">
                <FaFilm className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Director</h2>
              <p className="text-gray-400 mb-6">
                Join as a director to post roles and find talented actors for your film and television projects.
              </p>
              <button className="bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white rounded-lg px-8 py-3 font-semibold hover:opacity-90 transition-opacity">
                Join as Director
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Roleselector;
