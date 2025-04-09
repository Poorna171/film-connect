import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMoon, FaSun, FaBell, FaEnvelope, FaLock, FaGlobe, FaSignOutAlt, FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState('public');
  const [language, setLanguage] = useState('english');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showProfileTooltip, setShowProfileTooltip] = useState(false);
  const [showLanguageTooltip, setShowLanguageTooltip] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load saved settings on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedLang = localStorage.getItem('lang');
    
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
      document.documentElement.classList.toggle('dark', prefersDark);
    }
    
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  // Toggle dark mode
  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    
    // Play toggle sound
    playToggleSound();
    
    // Show notification
    console.log(`${newDarkMode ? 'Dark' : 'Light'} mode enabled`);
  };

  // Toggle email notifications
  const handleEmailNotificationsToggle = () => {
    const newValue = !emailNotifications;
    setEmailNotifications(newValue);
    playToggleSound();
    console.log(`Email notifications ${newValue ? 'enabled' : 'disabled'}`);
  };

  // Toggle push notifications
  const handlePushNotificationsToggle = async () => {
    if (!pushNotifications) {
      // Request permission
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          setPushNotifications(true);
          playToggleSound();
          console.log('Push notifications enabled');
        } else {
          console.error('Push notification permission denied');
        }
      } catch (error) {
        console.error('Failed to enable push notifications');
      }
    } else {
      setPushNotifications(false);
      playToggleSound();
      console.log('Push notifications disabled');
    }
  };

  // Toggle 2FA
  const handleTwoFactorAuthToggle = () => {
    if (!twoFactorAuth) {
      // Show confirmation dialog
      if (window.confirm('Are you sure you want to enable two-factor authentication? This will require additional verification steps when logging in.')) {
        setTwoFactorAuth(true);
        playToggleSound();
        console.log('Two-factor authentication enabled');
      }
    } else {
      // Show confirmation dialog
      if (window.confirm('Are you sure you want to disable two-factor authentication? This will make your account less secure.')) {
        setTwoFactorAuth(false);
        playToggleSound();
        console.log('Two-factor authentication disabled');
      }
    }
  };

  // Change profile visibility
  const handleProfileVisibilityChange = (e) => {
    const newValue = e.target.value;
    setProfileVisibility(newValue);
    console.log(`Profile visibility set to ${newValue}`);
  };

  // Change language
  const handleLanguageChange = (e) => {
    const newValue = e.target.value;
    setLanguage(newValue);
    localStorage.setItem('lang', newValue);
    console.log(`Language set to ${newValue}`);
  };

  // Handle logout
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out');
    } finally {
      setIsLoading(false);
      setShowLogoutConfirm(false);
    }
  };

  // Play toggle sound
  const playToggleSound = () => {
    const audio = new Audio('/sounds/toggle.mp3');
    audio.volume = 0.2;
    audio.play().catch(err => console.log('Audio play failed:', err));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-fuchsia-500 to-blue-600 bg-clip-text text-transparent mb-8">
        Settings
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Appearance */}
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-6">Appearance</h2>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {darkMode ? <FaMoon className="w-5 h-5 text-fuchsia-400" /> : <FaSun className="w-5 h-5 text-yellow-400" />}
              <span className="text-white">Dark Mode</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleDarkModeToggle}
              className={`relative w-14 h-7 rounded-full transition-colors duration-200 ${
                darkMode ? 'bg-fuchsia-500' : 'bg-gray-600'
              }`}
            >
              <motion.div
                initial={false}
                animate={{ x: darkMode ? 28 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md"
              />
            </motion.button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-6">Notifications</h2>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <FaEnvelope className="w-5 h-5 text-blue-400" />
              <span className="text-white">Email Notifications</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleEmailNotificationsToggle}
              className={`relative w-14 h-7 rounded-full transition-colors duration-200 ${
                emailNotifications ? 'bg-blue-500' : 'bg-gray-600'
              }`}
            >
              <motion.div
                initial={false}
                animate={{ x: emailNotifications ? 28 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md"
              />
            </motion.button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaBell className="w-5 h-5 text-green-400" />
              <span className="text-white">Push Notifications</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handlePushNotificationsToggle}
              className={`relative w-14 h-7 rounded-full transition-colors duration-200 ${
                pushNotifications ? 'bg-green-500' : 'bg-gray-600'
              }`}
            >
              <motion.div
                initial={false}
                animate={{ x: pushNotifications ? 28 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md"
              />
            </motion.button>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-6">Security</h2>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <FaLock className="w-5 h-5 text-red-400" />
              <span className="text-white">Two-Factor Authentication</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleTwoFactorAuthToggle}
              className={`relative w-14 h-7 rounded-full transition-colors duration-200 ${
                twoFactorAuth ? 'bg-red-500' : 'bg-gray-600'
              }`}
            >
              <motion.div
                initial={false}
                animate={{ x: twoFactorAuth ? 28 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md"
              />
            </motion.button>
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-6">Privacy</h2>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-white">Profile Visibility</span>
                <div 
                  className="relative"
                  onMouseEnter={() => setShowProfileTooltip(true)}
                  onMouseLeave={() => setShowProfileTooltip(false)}
                >
                  <FaInfoCircle className="w-4 h-4 text-gray-400 cursor-help" />
                  {showProfileTooltip && (
                    <div className="absolute left-0 top-6 w-48 p-2 bg-gray-800 text-xs text-white rounded-md z-10">
                      Controls who can see your profile
                    </div>
                  )}
                </div>
              </div>
            </div>
            <select
              value={profileVisibility}
              onChange={handleProfileVisibilityChange}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 outline-none transition-all text-white"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="friends">Friends Only</option>
            </select>
          </div>
        </div>

        {/* Language */}
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-6">Language</h2>
          
          <div className="mb-2">
            <div className="flex items-center gap-3 mb-2">
              <FaGlobe className="w-5 h-5 text-purple-400" />
              <span className="text-white">Language</span>
              <div 
                className="relative"
                onMouseEnter={() => setShowLanguageTooltip(true)}
                onMouseLeave={() => setShowLanguageTooltip(false)}
              >
                <FaInfoCircle className="w-4 h-4 text-gray-400 cursor-help" />
                {showLanguageTooltip && (
                  <div className="absolute left-0 top-6 w-48 p-2 bg-gray-800 text-xs text-white rounded-md z-10">
                    Select your preferred language
                  </div>
                )}
              </div>
            </div>
            <select
              value={language}
              onChange={handleLanguageChange}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 outline-none transition-all text-white"
            >
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              <option value="german">German</option>
              <option value="chinese">Chinese</option>
            </select>
          </div>
        </div>

        {/* Account */}
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h2 className="text-xl font-semibold text-white mb-6">Account</h2>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2"
          >
            <FaSignOutAlt className="w-4 h-4" />
            <span>Logout</span>
          </motion.button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#1A1F2E] rounded-xl p-6 max-w-md w-full mx-4 border border-white/10"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Confirm Logout</h3>
              <p className="text-gray-400 mb-6">Are you sure you want to log out?</p>
              <div className="flex justify-end gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowLogoutConfirm(false)}
                  className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  disabled={isLoading}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <FaSignOutAlt className="w-4 h-4" />
                  )}
                  <span>Logout</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Settings; 