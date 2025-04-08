import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTheaterMasks, FaVideo } from 'react-icons/fa';

const RoleSelection = ({ onSelectRole }) => {
  const [hoveredRole, setHoveredRole] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-4">
      <motion.div 
        className="max-w-4xl w-full"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-bold text-center text-white mb-2"
          variants={itemVariants}
        >
          Film Connect
        </motion.h1>
        <motion.p 
          className="text-xl text-center text-gray-300 mb-12"
          variants={itemVariants}
        >
          Choose your role in the film industry
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Actor Option */}
          <motion.div
            className="relative overflow-hidden rounded-xl cursor-pointer"
            variants={itemVariants}
            whileHover="hover"
            onHoverStart={() => setHoveredRole('actor')}
            onHoverEnd={() => setHoveredRole(null)}
            onClick={() => onSelectRole('actor')}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-90"></div>
            <div className="relative p-8 h-64 flex flex-col items-center justify-center text-white">
              <motion.div
                animate={{ 
                  scale: hoveredRole === 'actor' ? 1.1 : 1,
                  rotate: hoveredRole === 'actor' ? 5 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <FaTheaterMasks className="text-6xl mb-4" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-2">Actor</h2>
              <p className="text-center text-gray-200">
                Showcase your talent, find roles, and connect with directors
              </p>
              <motion.div 
                className="mt-6 px-6 py-2 bg-white text-purple-600 rounded-full font-medium"
                animate={{ 
                  scale: hoveredRole === 'actor' ? 1.05 : 1,
                  boxShadow: hoveredRole === 'actor' ? "0px 5px 15px rgba(255, 255, 255, 0.3)" : "none"
                }}
              >
                Join as Actor
              </motion.div>
            </div>
          </motion.div>

          {/* Director Option */}
          <motion.div
            className="relative overflow-hidden rounded-xl cursor-pointer"
            variants={itemVariants}
            whileHover="hover"
            onHoverStart={() => setHoveredRole('director')}
            onHoverEnd={() => setHoveredRole(null)}
            onClick={() => onSelectRole('director')}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 opacity-90"></div>
            <div className="relative p-8 h-64 flex flex-col items-center justify-center text-white">
              <motion.div
                animate={{ 
                  scale: hoveredRole === 'director' ? 1.1 : 1,
                  rotate: hoveredRole === 'director' ? -5 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <FaVideo className="text-6xl mb-4" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-2">Director</h2>
              <p className="text-center text-gray-200">
                Post casting calls, find talent, and bring your vision to life
              </p>
              <motion.div 
                className="mt-6 px-6 py-2 bg-white text-red-600 rounded-full font-medium"
                animate={{ 
                  scale: hoveredRole === 'director' ? 1.05 : 1,
                  boxShadow: hoveredRole === 'director' ? "0px 5px 15px rgba(255, 255, 255, 0.3)" : "none"
                }}
              >
                Join as Director
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.p 
          className="text-center text-gray-400 mt-8"
          variants={itemVariants}
        >
          Already have an account? <a href="#" className="text-blue-400 hover:underline">Sign in</a>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default RoleSelection; 