import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaHome, 
  FaSearch, 
  FaUser, 
  FaClipboardList, 
  FaCog, 
  FaPlus, 
  FaBell, 
  FaSignOutAlt, 
  FaUserPlus, 
  FaUserMinus,
  FaFilm
} from 'react-icons/fa';

const UserDashboard = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // State for user dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // State for follow/unfollow
  const [followedProfiles, setFollowedProfiles] = useState({});
  
  // Dummy data for user
  const isDirector = true; // Toggle between true/false to see different views
  
  // Dummy data for profiles
  const profiles = [
    { id: 1, name: 'Emma Watson', role: 'Actor', image: 'https://randomuser.me/api/portraits/women/1.jpg', type: 'actor' },
    { id: 2, name: 'Christopher Nolan', role: 'Director', image: 'https://randomuser.me/api/portraits/men/1.jpg', type: 'director' },
    { id: 3, name: 'Leonardo DiCaprio', role: 'Actor', image: 'https://randomuser.me/api/portraits/men/2.jpg', type: 'actor' },
    { id: 4, name: 'Martin Scorsese', role: 'Director', image: 'https://randomuser.me/api/portraits/men/3.jpg', type: 'director' },
    { id: 5, name: 'Scarlett Johansson', role: 'Actor', image: 'https://randomuser.me/api/portraits/women/2.jpg', type: 'actor' },
    { id: 6, name: 'Quentin Tarantino', role: 'Director', image: 'https://randomuser.me/api/portraits/men/4.jpg', type: 'director' },
  ];
  
  // Toggle follow/unfollow
  const toggleFollow = (profileId) => {
    setFollowedProfiles(prev => ({
      ...prev,
      [profileId]: !prev[profileId]
    }));
  };
  
  // Navigation tabs
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaHome /> },
    { id: 'search', label: 'Search Profiles', icon: <FaSearch /> },
    { id: 'profile', label: 'My Profile', icon: <FaUser /> },
    ...(isDirector ? [{ id: 'posted-roles', label: 'Posted Roles', icon: <FaClipboardList /> }] : []),
    { id: 'settings', label: 'Settings', icon: <FaCog /> },
  ];
  
  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-white/5 backdrop-blur-md border-r border-white/10 p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-8">
          <FaFilm className="w-8 h-8 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-blue-600" />
          <h1 className="text-xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-blue-600">
              Film Connect
            </span>
          </h1>
        </div>
        
        <nav className="flex-1">
          <ul className="space-y-2">
            {tabs.map(tab => (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-gradient-to-r from-fuchsia-500/20 to-blue-600/20 text-white border border-white/10' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="mt-auto pt-4 border-t border-white/10">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="h-16 bg-white/5 backdrop-blur-md border-b border-white/10 px-6 flex items-center justify-between">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search actors or directors..."
                className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <FaBell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-fuchsia-500 rounded-full"></span>
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <img 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="User" 
                  className="w-10 h-10 rounded-full border-2 border-white/10"
                />
                <span className="text-sm font-medium">John Doe</span>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg shadow-lg overflow-hidden z-10">
                  <button className="w-full flex items-center gap-2 px-4 py-3 text-left text-gray-300 hover:bg-white/10 transition-colors">
                    <FaUser className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  <button className="w-full flex items-center gap-2 px-4 py-3 text-left text-gray-300 hover:bg-white/10 transition-colors">
                    <FaSignOutAlt className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'search' && 'Search Profiles'}
              {activeTab === 'profile' && 'My Profile'}
              {activeTab === 'posted-roles' && 'Posted Roles'}
              {activeTab === 'settings' && 'Settings'}
            </h2>
            
            {isDirector && activeTab === 'dashboard' && (
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-fuchsia-500 to-blue-600 rounded-lg font-medium hover:opacity-90 transition-opacity">
                <FaPlus />
                <span>Post a Role</span>
              </button>
            )}
          </div>
          
          {/* Dashboard Content */}
          {activeTab === 'dashboard' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {profiles.map(profile => (
                  <motion.div
                    key={profile.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:border-fuchsia-500/50 transition-colors"
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <img 
                          src={profile.image} 
                          alt={profile.name} 
                          className="w-16 h-16 rounded-full border-2 border-white/10"
                        />
                        <div>
                          <h3 className="font-bold text-lg">{profile.name}</h3>
                          <p className="text-gray-400">{profile.role}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">
                          {profile.type === 'actor' ? 'Actor' : 'Director'}
                        </span>
                        <button
                          onClick={() => toggleFollow(profile.id)}
                          className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                            followedProfiles[profile.id]
                              ? 'bg-white/10 text-white'
                              : 'bg-gradient-to-r from-fuchsia-500 to-blue-600 text-white'
                          }`}
                        >
                          {followedProfiles[profile.id] ? (
                            <>
                              <FaUserMinus className="w-3 h-3" />
                              <span>Unfollow</span>
                            </>
                          ) : (
                            <>
                              <FaUserPlus className="w-3 h-3" />
                              <span>Follow</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          
          {/* Other Tab Content Placeholders */}
          {activeTab !== 'dashboard' && (
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 text-center">
              <p className="text-gray-400">
                {activeTab === 'search' && 'Search functionality coming soon...'}
                {activeTab === 'profile' && 'Profile management coming soon...'}
                {activeTab === 'posted-roles' && 'Role management coming soon...'}
                {activeTab === 'settings' && 'Settings coming soon...'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard; 