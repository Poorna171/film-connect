import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaHome, FaBriefcase, FaUser, FaBell, FaSearch, 
  FaPlus, FaFilm, FaUsers, FaStar, FaEnvelope, FaPaperPlane,
  FaCog
} from 'react-icons/fa';

// Mock data for demonstration
const mockRoles = [
  {
    id: 1,
    title: 'Lead Actor - Drama Series',
    director: 'Sarah Director',
    location: 'Los Angeles, CA',
    postedDate: '2 days ago',
    deadline: '2023-12-15',
    status: 'open',
    description: 'Looking for a charismatic lead actor for an upcoming drama series. The role requires strong emotional range and improvisation skills.',
    requirements: ['5+ years of acting experience', 'Strong emotional range', 'Available for 3 months', 'Based in Los Angeles']
  },
  {
    id: 2,
    title: 'Supporting Role - Action Film',
    director: 'Michael Producer',
    location: 'New York, NY',
    postedDate: '1 week ago',
    deadline: '2023-12-20',
    status: 'open',
    description: 'Seeking a dynamic supporting actor for an action-packed thriller. Physical fitness and stunt experience a plus.',
    requirements: ['3+ years of acting experience', 'Physical fitness', 'Stunt experience preferred', 'Available for 2 months']
  },
  {
    id: 3,
    title: 'Character Actor - Comedy',
    director: 'James Filmmaker',
    location: 'Chicago, IL',
    postedDate: '3 days ago',
    deadline: '2023-12-10',
    status: 'closed',
    description: 'In need of a versatile character actor with comedic timing for a new sitcom pilot.',
    requirements: ['Comedy experience', 'Improv skills', 'Available for 1 month', 'Based in Chicago']
  }
];

const mockApplications = [
  {
    id: 1,
    roleId: 1,
    roleTitle: 'Lead Actor - Drama Series',
    director: 'Sarah Director',
    appliedDate: '2023-11-10',
    status: 'pending',
    coverLetter: 'I am excited to apply for this role as it perfectly matches my acting style and experience...'
  },
  {
    id: 2,
    roleId: 2,
    roleTitle: 'Supporting Role - Action Film',
    director: 'Michael Producer',
    appliedDate: '2023-11-05',
    status: 'reviewed',
    coverLetter: 'With my background in action films and stunt work, I believe I would be an excellent fit for this role...'
  }
];

const mockPostedRoles = [
  {
    id: 1,
    title: 'Female Lead - Thriller',
    location: 'Los Angeles, CA',
    postedDate: '2023-11-01',
    deadline: '2023-12-01',
    applications: 12,
    status: 'open',
    description: 'Seeking a compelling female lead for a psychological thriller. The role demands a strong presence and ability to convey complex emotions.',
    requirements: ['5+ years of acting experience', 'Strong screen presence', 'Available for 4 months', 'Based in Los Angeles'],
    credentials: {
      ageRange: '25-35',
      gender: 'Female',
      ethnicity: 'Any',
      height: '5\'4" - 5\'8"',
      languages: ['English'],
      specialSkills: ['Dancing', 'Martial Arts']
    }
  },
  {
    id: 2,
    title: 'Male Supporting - Drama',
    location: 'New York, NY',
    postedDate: '2023-10-15',
    deadline: '2023-11-15',
    applications: 8,
    status: 'open',
    description: 'Looking for a talented male actor to play a supporting role in an independent drama film.',
    requirements: ['3+ years of acting experience', 'Theater background preferred', 'Available for 2 months', 'Based in New York'],
    credentials: {
      ageRange: '30-45',
      gender: 'Male',
      ethnicity: 'Any',
      height: '5\'10" - 6\'2"',
      languages: ['English'],
      specialSkills: ['Singing', 'Accents']
    }
  }
];

const Dashboard = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [showPostRoleModal, setShowPostRoleModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showViewApplicationModal, setShowViewApplicationModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const renderSidebar = () => (
    <div className="bg-[#0A0F1C] text-white w-64 min-h-screen p-4 border-r border-white/10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-fuchsia-500 to-blue-600 bg-clip-text text-transparent">Film Connect</h1>
        <p className="text-gray-400 text-sm">Cinematic Networking</p>
      </div>
      
      <nav className="space-y-2">
        <button 
          className={`flex items-center w-full p-3 rounded-lg transition-all ${activeTab === 'home' ? 'bg-gradient-to-r from-fuchsia-600/20 to-blue-600/20 border border-white/10' : 'hover:bg-white/5'}`}
          onClick={() => setActiveTab('home')}
        >
          <FaHome className="mr-3" />
          <span>Home</span>
        </button>
        
        <button 
          className={`flex items-center w-full p-3 rounded-lg transition-all ${activeTab === 'roles' ? 'bg-gradient-to-r from-fuchsia-600/20 to-blue-600/20 border border-white/10' : 'hover:bg-white/5'}`}
          onClick={() => setActiveTab('roles')}
        >
          <FaBriefcase className="mr-3" />
          <span>{userRole === 'actor' ? 'Available Roles' : 'Posted Roles'}</span>
        </button>
        
        {userRole === 'actor' && (
          <button 
            className={`flex items-center w-full p-3 rounded-lg transition-all ${activeTab === 'apply' ? 'bg-gradient-to-r from-fuchsia-600/20 to-blue-600/20 border border-white/10' : 'hover:bg-white/5'}`}
            onClick={() => setActiveTab('apply')}
          >
            <FaPaperPlane className="mr-3" />
            <span>My Applications</span>
          </button>
        )}
        
        <button 
          className={`flex items-center w-full p-3 rounded-lg transition-all ${activeTab === 'network' ? 'bg-gradient-to-r from-fuchsia-600/20 to-blue-600/20 border border-white/10' : 'hover:bg-white/5'}`}
          onClick={() => setActiveTab('network')}
        >
          <FaUsers className="mr-3" />
          <span>Network</span>
        </button>
        
        <button 
          className={`flex items-center w-full p-3 rounded-lg transition-all ${activeTab === 'profile' ? 'bg-gradient-to-r from-fuchsia-600/20 to-blue-600/20 border border-white/10' : 'hover:bg-white/5'}`}
          onClick={() => setActiveTab('profile')}
        >
          <FaUser className="mr-3" />
          <span>Profile</span>
        </button>
        
        <button 
          className={`flex items-center w-full p-3 rounded-lg transition-all ${activeTab === 'notifications' ? 'bg-gradient-to-r from-fuchsia-600/20 to-blue-600/20 border border-white/10' : 'hover:bg-white/5'}`}
          onClick={() => setActiveTab('notifications')}
        >
          <FaBell className="mr-3" />
          <span>Notifications</span>
        </button>
        
        <button 
          className={`flex items-center w-full p-3 rounded-lg transition-all ${activeTab === 'messages' ? 'bg-gradient-to-r from-fuchsia-600/20 to-blue-600/20 border border-white/10' : 'hover:bg-white/5'}`}
          onClick={() => setActiveTab('messages')}
        >
          <FaEnvelope className="mr-3" />
          <span>Messages</span>
        </button>
        
        <button 
          className={`flex items-center w-full p-3 rounded-lg transition-all ${activeTab === 'settings' ? 'bg-gradient-to-r from-fuchsia-600/20 to-blue-600/20 border border-white/10' : 'hover:bg-white/5'}`}
          onClick={() => setActiveTab('settings')}
        >
          <FaCog className="mr-3" />
          <span>Settings</span>
        </button>
      </nav>
    </div>
  );

  const renderHeader = () => (
    <header className="bg-[#0A0F1C] border-b border-white/10 p-4 flex justify-between items-center">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for roles, directors, actors..."
            className="w-full px-4 py-2 pl-10 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500 text-white placeholder-gray-400"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-400 hover:text-white transition-colors">
          <FaBell className="text-xl" />
        </button>
        <div className="flex items-center space-x-2">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-fuchsia-500"
          />
          <span className="font-medium text-white">John Doe</span>
        </div>
      </div>
    </header>
  );

  const renderHomeContent = () => (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Welcome back, John!</h2>
        {userRole === 'director' && (
          <button
            onClick={() => setShowPostRoleModal(true)}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            <FaPlus className="mr-2" />
            Post New Role
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <motion.div 
          className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">
              {userRole === 'actor' ? 'Applications' : 'Posted Roles'}
            </h3>
            <div className="p-3 bg-gradient-to-r from-fuchsia-600/20 to-blue-600/20 rounded-full">
              <FaBriefcase className="text-fuchsia-400" />
            </div>
          </div>
          <p className="text-3xl font-bold mt-4 text-white">
            {userRole === 'actor' ? mockApplications.length : mockPostedRoles.length}
          </p>
          <p className="text-gray-400 text-sm mt-1">
            {userRole === 'actor' ? 'Total applications' : 'Active casting calls'}
          </p>
        </motion.div>
        
        <motion.div 
          className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">Profile Views</h3>
            <div className="p-3 bg-gradient-to-r from-fuchsia-600/20 to-blue-600/20 rounded-full">
              <FaUser className="text-fuchsia-400" />
            </div>
          </div>
          <p className="text-3xl font-bold mt-4 text-white">248</p>
          <p className="text-gray-400 text-sm mt-1">Last 30 days</p>
        </motion.div>
        
        <motion.div 
          className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-white">Connections</h3>
            <div className="p-3 bg-gradient-to-r from-fuchsia-600/20 to-blue-600/20 rounded-full">
              <FaUsers className="text-fuchsia-400" />
            </div>
          </div>
          <p className="text-3xl font-bold mt-4 text-white">56</p>
          <p className="text-gray-400 text-sm mt-1">Industry professionals</p>
        </motion.div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6">
        <h3 className="text-xl font-bold mb-4 text-white">Recent Activity</h3>
        <div className="space-y-4">
          {userRole === 'actor' ? (
            <>
              {mockApplications.map(app => (
                <motion.div 
                  key={app.id} 
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div>
                    <h4 className="font-medium text-white">{app.roleTitle}</h4>
                    <p className="text-sm text-gray-400">Applied on {app.appliedDate}</p>
                  </div>
                  <div className="flex items-center">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      app.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'
                    }`}>
                      {app.status === 'pending' ? 'Pending' : 'Reviewed'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </>
          ) : (
            <>
              {mockPostedRoles.map(role => (
                <motion.div 
                  key={role.id} 
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div>
                    <h4 className="font-medium text-white">{role.title}</h4>
                    <p className="text-sm text-gray-400">Posted on {role.postedDate}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-400">{role.applications} applications</span>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      role.status === 'open' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {role.status === 'open' ? 'Open' : 'Closed'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );

  const renderRolesContent = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">
          {userRole === 'actor' ? 'Available Roles' : 'Posted Roles'}
        </h2>
        {userRole === 'director' && (
          <button
            onClick={() => setShowPostRoleModal(true)}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            <FaPlus className="mr-2" />
            Add Role
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userRole === 'actor' ? (
          // Actor view - available roles
          mockRoles.map(role => (
            <motion.div
              key={role.id}
              className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-white">{role.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    role.status === 'open' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {role.status === 'open' ? 'Open' : 'Closed'}
                  </span>
                </div>
                <p className="text-gray-400 mt-2">Director: {role.director}</p>
                <p className="text-gray-400">Location: {role.location}</p>
                <div className="mt-4 flex justify-between text-sm text-gray-500">
                  <span>Posted: {role.postedDate}</span>
                  <span>Deadline: {role.deadline}</span>
                </div>
                <button 
                  className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                  onClick={() => {
                    setSelectedRole(role);
                    setShowApplyModal(true);
                  }}
                >
                  Apply Now
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          // Director view - posted roles
          mockPostedRoles.map(role => (
            <motion.div
              key={role.id}
              className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-white">{role.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    role.status === 'open' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {role.status === 'open' ? 'Open' : 'Closed'}
                  </span>
                </div>
                <p className="text-gray-400 mt-2">Location: {role.location}</p>
                <div className="mt-4 flex justify-between text-sm text-gray-500">
                  <span>Posted: {role.postedDate}</span>
                  <span>Deadline: {role.deadline}</span>
                </div>
                <div className="mt-4 space-y-2">
                  <button 
                    className="w-full px-4 py-2 bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                    onClick={() => {
                      setSelectedRole(role);
                      setShowViewApplicationModal(true);
                    }}
                  >
                    View Applications ({role.applications})
                  </button>
                  <button 
                    className="w-full px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                    onClick={() => {
                      setSelectedRole(role);
                      setShowPostRoleModal(true);
                    }}
                  >
                    Edit Role
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );

  const renderApplyContent = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">My Applications</h2>
      </div>
      
      <div className="space-y-6">
        {mockApplications.map(app => (
          <motion.div
            key={app.id}
            className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-white">{app.roleTitle}</h3>
                  <p className="text-gray-400">Director: {app.director}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs ${
                  app.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'
                }`}>
                  {app.status === 'pending' ? 'Pending' : 'Reviewed'}
                </span>
              </div>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-white">Cover Letter</h4>
                <p className="text-gray-400 text-sm mt-1 line-clamp-3">{app.coverLetter}</p>
              </div>
              
              <div className="mt-4 flex justify-between text-sm text-gray-500">
                <span>Applied on: {app.appliedDate}</span>
                <button className="text-fuchsia-400 hover:text-fuchsia-300 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderSettingsContent = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Settings</h2>
      </div>
      
      <div className="space-y-6">
        <motion.div
          className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="p-6">
            <h3 className="text-lg font-bold text-white mb-4">Account Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent text-white placeholder-gray-500"
                  placeholder="your.email@example.com"
                  defaultValue="john.doe@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent text-white placeholder-gray-500"
                  placeholder="••••••••"
                  defaultValue="••••••••"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent text-white placeholder-gray-500"
                  placeholder="Your name"
                  defaultValue="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Bio</label>
                <textarea
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent h-32 text-white placeholder-gray-500"
                  placeholder="Tell us about yourself..."
                  defaultValue="Experienced actor with a passion for dramatic roles and a background in theater."
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button className="px-4 py-2 bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="p-6">
            <h3 className="text-lg font-bold text-white mb-4">Notification Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Email Notifications</h4>
                  <p className="text-gray-400 text-sm">Receive notifications via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r from-fuchsia-600 to-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Application Updates</h4>
                  <p className="text-gray-400 text-sm">Get notified about your application status</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r from-fuchsia-600 to-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">New Role Alerts</h4>
                  <p className="text-gray-400 text-sm">Get notified about new roles matching your profile</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r from-fuchsia-600 to-blue-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Messages</h4>
                  <p className="text-gray-400 text-sm">Get notified when you receive new messages</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r from-fuchsia-600 to-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="p-6">
            <h3 className="text-lg font-bold text-white mb-4">Privacy Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Profile Visibility</h4>
                  <p className="text-gray-400 text-sm">Control who can see your profile</p>
                </div>
                <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500">
                  <option value="public">Public</option>
                  <option value="connections">Connections Only</option>
                  <option value="private">Private</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Show Online Status</h4>
                  <p className="text-gray-400 text-sm">Let others know when you're active</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r from-fuchsia-600 to-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          className="bg-red-500/10 backdrop-blur-lg rounded-xl border border-red-500/20 overflow-hidden"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="p-6">
            <h3 className="text-lg font-bold text-red-400 mb-4">Danger Zone</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-medium">Delete Account</h4>
                <p className="text-gray-400 text-sm mb-2">Permanently delete your account and all associated data</p>
                <button className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors border border-red-500/30">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return renderHomeContent();
      case 'roles':
        return renderRolesContent();
      case 'apply':
        return renderApplyContent();
      case 'network':
        return <div className="p-6 text-white">Network content coming soon</div>;
      case 'profile':
        return <div className="p-6 text-white">Profile content coming soon</div>;
      case 'notifications':
        return <div className="p-6 text-white">Notifications content coming soon</div>;
      case 'messages':
        return <div className="p-6 text-white">Messages content coming soon</div>;
      case 'settings':
        return renderSettingsContent();
      default:
        return renderHomeContent();
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0A0F1C]">
      {renderSidebar()}
      
      <div className="flex-1">
        {renderHeader()}
        <main>
          {renderContent()}
        </main>
      </div>
      
      {/* Post Role Modal (for directors) */}
      {showPostRoleModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-[#0A0F1C] rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {selectedRole ? 'Edit Role' : 'Post a New Role'}
              </h2>
              <button 
                onClick={() => setShowPostRoleModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Role Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent text-white placeholder-gray-500"
                  placeholder="e.g. Lead Actor - Drama Series"
                  defaultValue={selectedRole?.title}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent text-white placeholder-gray-500"
                    placeholder="e.g. Los Angeles, CA"
                    defaultValue={selectedRole?.location}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Deadline</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent text-white"
                    defaultValue={selectedRole?.deadline}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Role Description</label>
                <textarea
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent h-32 text-white placeholder-gray-500"
                  placeholder="Describe the role, requirements, and any other relevant information..."
                  defaultValue={selectedRole?.description}
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Role Credentials</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Age Range</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent text-white placeholder-gray-500"
                      placeholder="e.g. 25-35"
                      defaultValue={selectedRole?.credentials?.ageRange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Gender</label>
                    <select
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent text-white"
                      defaultValue={selectedRole?.credentials?.gender}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Any">Any</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Height Range</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent text-white placeholder-gray-500"
                      placeholder="e.g. 5&apos;4&quot; - 5&apos;8&quot;"
                      defaultValue={selectedRole?.credentials?.height}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Languages</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent text-white placeholder-gray-500"
                      placeholder="e.g. English, Spanish"
                      defaultValue={selectedRole?.credentials?.languages?.join(', ')}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowPostRoleModal(false)}
                  className="px-4 py-2 bg-white/5 text-gray-300 rounded-lg hover:bg-white/10 border border-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  {selectedRole ? 'Update Role' : 'Post Role'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* View Applications Modal */}
      {showViewApplicationModal && selectedRole && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-[#0A0F1C] rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Applications for {selectedRole.title}</h2>
              <button 
                onClick={() => setShowViewApplicationModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {mockApplications.map(app => (
                <div key={app.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-white">{app.roleTitle}</h3>
                      <p className="text-gray-400">Applied on: {app.appliedDate}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      app.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'
                    }`}>
                      {app.status === 'pending' ? 'Pending Review' : 'Reviewed'}
                    </span>
                  </div>
                  <p className="text-gray-400 mt-2">{app.coverLetter}</p>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
                      View Profile
                    </button>
                    <button className="px-4 py-2 bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity">
                      Schedule Interview
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 