import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Briefcase, 
  Search, 
  Bell, 
  MessageSquare, 
  User,
  Settings,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const DashboardNavigation = ({ userRole }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/role-selector');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    {
      name: 'Home',
      path: `/${userRole}/dashboard`,
      icon: Home
    },
    {
      name: userRole === 'actor' ? 'Roles' : 'Applications',
      path: `/${userRole}/${userRole === 'actor' ? 'roles' : 'applications'}`,
      icon: Briefcase
    },
    ...(userRole === 'actor' ? [
      {
        name: 'Applications',
        path: `/${userRole}/applications`,
        icon: Briefcase
      }
    ] : []),
    ...(userRole === 'director' ? [
      {
        name: 'Roles',
        path: `/${userRole}/roles`,
        icon: Briefcase
      }
    ] : []),
    {
      name: 'Discover',
      path: `/${userRole}/discover`,
      icon: Search
    },
    {
      name: 'Alerts',
      path: `/${userRole}/alerts`,
      icon: Bell
    },
    {
      name: 'Messages',
      path: `/${userRole}/messages`,
      icon: MessageSquare
    },
    {
      name: 'Profile',
      path: `/${userRole}/profile`,
      icon: User
    },
    {
      name: 'Settings',
      path: `/${userRole}/settings`,
      icon: Settings
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          isScrolled ? 'bg-[#0A0F1C]/95 backdrop-blur-md shadow-lg' : 'bg-[#0A0F1C]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to={`/${userRole}/dashboard`} className="text-xl font-bold bg-gradient-to-r from-fuchsia-500 to-blue-600 bg-clip-text text-transparent">
                FilmConnect
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? 'text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center space-x-1">
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </div>
                    {isActive(item.path) && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-fuchsia-500 to-blue-600"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
              
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors flex items-center space-x-1"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <motion.div
        initial={false}
        animate={isMobileMenuOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, y: 0 },
          closed: { opacity: 0, y: -20 }
        }}
        className={`md:hidden fixed inset-x-0 top-16 z-40 bg-[#0A0F1C]/95 backdrop-blur-md shadow-lg ${
          isMobileMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </div>
              </Link>
            );
          })}
          
          {/* Mobile Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full px-3 py-2 rounded-lg text-base font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors flex items-center space-x-3"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </motion.div>

      {/* Spacer for fixed navigation */}
      <div className="h-16" />
    </>
  );
};

export default DashboardNavigation; 