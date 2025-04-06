import React, { useState } from 'react';
import {
  FaHome, FaSearch, FaUser, FaProjectDiagram, FaUserTie, FaCog, FaSignOutAlt,
  FaBell, FaEnvelope, FaEllipsisV
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

// Mock data for profiles
const mockProfiles = [
  {
    id: 1,
    name: 'Emma Watson',
    role: 'Actor',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    isFollowing: false
  },
  {
    id: 2,
    name: 'Tom Hanks',
    role: 'Actor',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    isFollowing: true
  },
  {
    id: 3,
    name: 'Scarlett Johansson',
    role: 'Actor',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    isFollowing: false
  },
  {
    id: 4,
    name: 'Leonardo DiCaprio',
    role: 'Actor',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    isFollowing: true
  },
  {
    id: 5,
    name: 'Christopher Nolan',
    role: 'Director',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
    isFollowing: false
  },
  {
    id: 6,
    name: 'Meryl Streep',
    role: 'Actor',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    isFollowing: true
  }
];

// Sidebar component
const Sidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { key: 'dashboard', label: 'Dashboard', icon: <FaHome /> },
    { key: 'search', label: 'Search Profiles', icon: <FaSearch /> },
    { key: 'profile', label: 'My Profile', icon: <FaUser /> },
    { key: 'projects', label: 'Projects', icon: <FaProjectDiagram /> },
    { key: 'post-role', label: 'Post a Role', icon: <FaUserTie /> },
    { key: 'settings', label: 'Settings', icon: <FaCog /> },
    { key: 'logout', label: 'Logout', icon: <FaSignOutAlt /> }
  ];

  return (
    <div className="w-64 bg-white/5 backdrop-blur-lg border-r border-white/10 h-screen fixed left-0 top-0 p-6 hidden md:block">
      <div className="mb-10">
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-fuchsia-500 to-blue-500 text-transparent bg-clip-text">
          🎬 FilmConnect
        </h1>
        <p className="text-gray-400 text-sm mt-1">Director Portal</p>
      </div>
      
      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`flex items-center w-full px-4 py-3 rounded-xl transition duration-300 ${
              activeTab === item.key
                ? 'bg-gradient-to-r from-fuchsia-500/20 to-blue-500/20 text-white border border-white/10'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

// Topbar component
const Topbar = () => {
  return (
    <div className="h-16 bg-white/5 backdrop-blur-lg border-b border-white/10 fixed top-0 right-0 left-0 md:left-64 z-10 flex items-center px-6">
      <div className="flex-1 max-w-xl mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search actors, directors, roles..."
            className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition duration-300"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      
      <div className="flex items-center space-x-4 ml-4">
        <button className="p-2 text-gray-400 hover:text-white transition duration-300">
          <FaBell />
        </button>
        <button className="p-2 text-gray-400 hover:text-white transition duration-300">
          <FaEnvelope />
        </button>
        <div className="flex items-center space-x-3">
          <img 
            src="https://randomuser.me/api/portraits/men/32.jpg" 
            alt="Director" 
            className="w-8 h-8 rounded-full border-2 border-fuchsia-500"
          />
          <button className="p-1 text-gray-400 hover:text-white transition duration-300">
            <FaEllipsisV />
          </button>
        </div>
      </div>
    </div>
  );
};

// Profile Card component
const ProfileCard = ({ profile, onFollowToggle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-fuchsia-500/50 transition duration-300"
    >
      <div className="flex flex-col items-center text-center">
        <img 
          src={profile.image} 
          alt={profile.name} 
          className="w-20 h-20 rounded-full border-4 border-fuchsia-500/30 mb-4"
        />
        <h3 className="text-lg font-bold text-white">{profile.name}</h3>
        <p className="text-gray-400 mb-4">{profile.role}</p>
        <button
          onClick={() => onFollowToggle(profile.id)}
          className={`px-4 py-2 rounded-lg transition duration-300 ${
            profile.isFollowing
              ? 'bg-white/10 text-white hover:bg-white/20'
              : 'bg-gradient-to-r from-fuchsia-500 to-blue-500 text-white hover:from-fuchsia-600 hover:to-blue-600'
          }`}
        >
          {profile.isFollowing ? 'Following' : 'Follow'}
        </button>
      </div>
    </motion.div>
  );
};

// Main Dashboard component
const DirectorDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [profiles, setProfiles] = useState(mockProfiles);
  const navigate = useNavigate();

  const handleFollowToggle = (profileId) => {
    setProfiles(profiles.map(profile => 
      profile.id === profileId 
        ? { ...profile, isFollowing: !profile.isFollowing } 
        : profile
    ));
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    
    if (tab === 'post-role') {
      navigate('/director/post-role');
    } else if (tab === 'logout') {
      // Handle logout
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1C] via-[#1a1f3b] to-[#2a2f4b] text-white font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={handleTabClick} />
      <Topbar />
      
      <div className="pt-16 md:pl-64 min-h-screen">
        <div className="p-6 md:p-8">
          {activeTab === 'dashboard' && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Welcome, Director</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-medium text-white mb-2">Active Projects</h3>
                  <p className="text-3xl font-bold text-fuchsia-400">3</p>
                </div>
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-medium text-white mb-2">Posted Roles</h3>
                  <p className="text-3xl font-bold text-blue-400">12</p>
                </div>
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                  <h3 className="text-lg font-medium text-white mb-2">Applications</h3>
                  <p className="text-3xl font-bold text-pink-400">48</p>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 mb-8">
                <h3 className="text-lg font-medium text-white mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-fuchsia-400 mt-2 mr-3"></div>
                    <div>
                      <p className="text-white">New application received for <span className="text-fuchsia-400">Lead Character</span></p>
                      <p className="text-gray-400 text-sm">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 mr-3"></div>
                    <div>
                      <p className="text-white">Audition scheduled for <span className="text-blue-400">Supporting Role</span></p>
                      <p className="text-gray-400 text-sm">Yesterday</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-pink-400 mt-2 mr-3"></div>
                    <div>
                      <p className="text-white">New message from <span className="text-pink-400">Emma Watson</span></p>
                      <p className="text-gray-400 text-sm">2 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-white">Suggested Actors</h3>
                  <Link to="/director/roles" className="text-fuchsia-400 hover:text-fuchsia-300 transition duration-300">
                    View All
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {profiles.slice(0, 3).map(profile => (
                    <ProfileCard 
                      key={profile.id} 
                      profile={profile} 
                      onFollowToggle={handleFollowToggle} 
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'search' && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Search Profiles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {profiles.map(profile => (
                  <ProfileCard 
                    key={profile.id} 
                    profile={profile} 
                    onFollowToggle={handleFollowToggle} 
                  />
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">My Profile</h2>
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                <p className="text-gray-300">Profile content will go here</p>
              </div>
            </div>
          )}
          
          {activeTab === 'projects' && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">My Projects</h2>
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                <p className="text-gray-300">Projects content will go here</p>
              </div>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Settings</h2>
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                <p className="text-gray-300">Settings content will go here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DirectorDashboard;
