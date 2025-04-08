import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, Film, Bell, User, MessageSquare, 
  FileText, Briefcase, Users, Settings,
  Menu, X
} from 'lucide-react';

const DashboardLayout = ({ children, userRole }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(location.pathname.split('/').pop() || 'home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Define navigation tabs based on user role
  const navTabs = [
    { id: 'home', icon: Home, label: 'Home', path: `/${userRole}-dashboard` },
    ...(userRole === 'director' 
      ? [
          { id: 'roles', icon: Film, label: 'Roles', path: `/director/roles` },
          { id: 'discover', icon: Users, label: 'Discover', path: `/director/discover` }
        ] 
      : [
          { id: 'applications', icon: Briefcase, label: 'Applications', path: `/actor/applications` },
          { id: 'discover', icon: Users, label: 'Discover', path: `/actor/discover` }
        ]
    ),
    { id: 'notifications', icon: Bell, label: 'Alerts', path: `/${userRole}/notifications` },
    { id: 'messages', icon: MessageSquare, label: 'Messages', path: `/${userRole}/messages` },
    { id: 'profile', icon: User, label: 'Profile', path: `/${userRole}/profile` },
    { id: 'settings', icon: Settings, label: 'Settings', path: `/${userRole}/settings` }
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab.id);
    navigate(tab.path);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0F1C]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-blue-600">
                  FilmConnect
                </Link>
              </div>
              {/* Desktop Navigation */}
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                {navTabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => handleTabClick(tab)}
                    className={`${
                      activeTab === tab.id
                        ? 'text-fuchsia-400'
                        : 'text-gray-300 hover:text-white'
                    } inline-flex items-center px-3 py-2 text-sm font-medium transition-colors relative`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <tab.icon className="w-4 h-4 mr-2" />
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-fuchsia-500 to-blue-600"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isMobileMenuOpen ? 'auto' : 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navTabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => handleTabClick(tab)}
                className={`${
                  activeTab === tab.id
                    ? 'bg-white/10 text-fuchsia-400'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                } flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors`}
                whileTap={{ scale: 0.95 }}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </nav>

      {/* Main Content */}
      <main className="h-[calc(100vh-4rem)] mt-16">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout; 