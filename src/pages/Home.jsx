import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFilm, FaUserTie, FaUserNinja, FaSignInAlt } from 'react-icons/fa';
import GridBackground from '../components/GridBackground';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#0A0F1C] to-[#0A0F1C]" />
        <GridBackground />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <FaFilm className="w-24 h-24 mx-auto text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-blue-600" />
          </motion.div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-6xl font-black mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-blue-600">
              Film Connect
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl text-gray-400 mb-12"
          >
            Connecting talented actors with visionary directors in the film industry
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/role-selector"
              className="px-8 py-4 bg-gradient-to-r from-fuchsia-500 to-blue-600 rounded-lg font-bold hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
            <Link
              to="/login/actor"
              className="px-8 py-4 bg-white/10 rounded-lg font-bold hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
            >
              <FaSignInAlt />
              Sign In
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-blue-600">
              Key Features
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Actor Features */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white/5 p-8 rounded-xl backdrop-blur-sm"
            >
              <div className="flex items-center gap-4 mb-6">
                <FaUserNinja className="w-8 h-8 text-fuchsia-500" />
                <h3 className="text-2xl font-bold">For Actors</h3>
              </div>
              <ul className="space-y-4 text-gray-400">
                <li>• Create and manage your professional portfolio</li>
                <li>• Apply to casting calls from top directors</li>
                <li>• Direct messaging with directors</li>
                <li>• Track your audition history</li>
              </ul>
            </motion.div>

            {/* Director Features */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white/5 p-8 rounded-xl backdrop-blur-sm"
            >
              <div className="flex items-center gap-4 mb-6">
                <FaUserTie className="w-8 h-8 text-blue-600" />
                <h3 className="text-2xl font-bold">For Directors</h3>
              </div>
              <ul className="space-y-4 text-gray-400">
                <li>• Post and manage casting calls</li>
                <li>• Search and discover talented actors</li>
                <li>• Schedule auditions efficiently</li>
                <li>• Manage your production team</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 bg-gradient-to-b from-[#0A0F1C] to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-blue-600">
              Ready to Connect?
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-12">
            Join Film Connect today and take your career to the next level
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/role-selector"
              className="px-8 py-4 bg-gradient-to-r from-fuchsia-500 to-blue-600 rounded-lg font-bold hover:opacity-90 transition-opacity inline-block"
            >
              Get Started Now
            </Link>
            <Link
              to="/login/actor"
              className="px-8 py-4 bg-white/10 rounded-lg font-bold hover:bg-white/20 transition-colors inline-block flex items-center justify-center gap-2"
            >
              <FaSignInAlt />
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
