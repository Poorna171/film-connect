import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFilm, FaSearch, FaBell, FaUser, FaBriefcase } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    // Use a mock user ID for testing
    navigate('/profile/123');
  };

  return (
    <nav className="bg-[#0A0F1C]/80 backdrop-blur-lg border-b border-white/10 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <FaFilm className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-blue-600 text-3xl" />
            <span className="ml-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-blue-600">
              Film Connect
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for actors, directors, projects..."
                className="w-full px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              />
              <FaSearch className="absolute right-4 top-3 text-gray-400" />
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-6">
            <Link 
              to="/casting"
              className="flex flex-col items-center text-gray-400 hover:text-fuchsia-500 transition-colors"
            >
              <FaBriefcase className="text-xl" />
              <span className="text-xs mt-1">Casting</span>
            </Link>
            <button className="flex flex-col items-center text-gray-400 hover:text-fuchsia-500 transition-colors">
              <FaBell className="text-xl" />
              <span className="text-xs mt-1">Notifications</span>
            </button>
            <button 
              onClick={handleProfileClick}
              className="flex flex-col items-center text-gray-400 hover:text-fuchsia-500 transition-colors"
            >
              <FaUser className="text-xl" />
              <span className="text-xs mt-1">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 