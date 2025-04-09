import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Bell, Lock, Shield, Trash2,
  ChevronRight, LogOut, Smartphone, X,
  Check, AlertTriangle
} from 'lucide-react';

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState('account');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    inAppNotifications: true,
    roleAlerts: true,
    messageNotifications: true
  });
  const [privacy, setPrivacy] = useState({
    isProfilePublic: true,
    showActivity: true,
    allowMessages: true
  });
  const [security, setSecurity] = useState({
    twoFactorEnabled: false
  });

  const sections = [
    {
      id: 'account',
      title: 'Account Settings',
      icon: User,
      color: 'text-blue-500'
    },
    {
      id: 'notifications',
      title: 'Notification Preferences',
      icon: Bell,
      color: 'text-purple-500'
    },
    {
      id: 'privacy',
      title: 'Privacy Settings',
      icon: Lock,
      color: 'text-green-500'
    },
    {
      id: 'security',
      title: 'Security Settings',
      icon: Shield,
      color: 'text-yellow-500'
    }
  ];

  const activeSessions = [
    {
      device: 'iPhone 12 Pro',
      location: 'Los Angeles, CA',
      lastActive: '2 hours ago',
      browser: 'Safari'
    },
    {
      device: 'MacBook Pro',
      location: 'Los Angeles, CA',
      lastActive: 'Active now',
      browser: 'Chrome'
    }
  ];

  const handleDeleteAccount = () => {
    // Handle account deletion logic here
    setShowDeleteModal(false);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'account':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Personal Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    defaultValue="Sarah Chen"
                    className="w-full bg-white/5 rounded-lg px-4 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                  <input
                    type="email"
                    defaultValue="sarah@example.com"
                    className="w-full bg-white/5 rounded-lg px-4 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Bio</label>
                  <textarea
                    rows="4"
                    defaultValue="Award-winning director with 10+ years of experience..."
                    className="w-full bg-white/5 rounded-lg px-4 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Change Password</h3>
              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="Current Password"
                  className="w-full bg-white/5 rounded-lg px-4 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full bg-white/5 rounded-lg px-4 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50"
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="w-full bg-white/5 rounded-lg px-4 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50"
                />
                <button className="px-4 py-2 bg-fuchsia-500 hover:bg-fuchsia-600 rounded-lg transition-colors">
                  Update Password
                </button>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Email Notifications</h3>
              <div className="space-y-3">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-gray-300">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                    <button
                      onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key] }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        value ? 'bg-fuchsia-500' : 'bg-white/10'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Privacy Options</h3>
              <div className="space-y-3">
                {Object.entries(privacy).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-gray-300">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                    <button
                      onClick={() => setPrivacy(prev => ({ ...prev, [key]: !prev[key] }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        value ? 'bg-fuchsia-500' : 'bg-white/10'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Blocked Users</h3>
              <div className="bg-white/5 rounded-lg p-4 text-gray-400">
                No blocked users
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Enable 2FA</span>
                <button
                  onClick={() => setSecurity(prev => ({ ...prev, twoFactorEnabled: !prev.twoFactorEnabled }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    security.twoFactorEnabled ? 'bg-fuchsia-500' : 'bg-white/10'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      security.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Active Sessions</h3>
              <div className="space-y-3">
                {activeSessions.map((session, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{session.device}</h4>
                        <p className="text-sm text-gray-400">{session.browser} • {session.location}</p>
                        <p className="text-sm text-gray-400">{session.lastActive}</p>
                      </div>
                      <button className="text-red-400 hover:text-red-300">
                        End Session
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  activeSection === section.id
                    ? 'bg-white/10 border border-fuchsia-500/50'
                    : 'hover:bg-white/5'
                }`}
              >
                <section.icon className={`w-5 h-5 ${section.color}`} />
                <span>{section.title}</span>
              </button>
            ))}

            <button
              onClick={() => setShowDeleteModal(true)}
              className="w-full flex items-center space-x-3 p-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
              <span>Delete Account</span>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 bg-white/5 rounded-xl p-6 border border-white/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-[#0A0F1C] rounded-xl p-6 max-w-md w-full border border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-medium">Delete Account</h3>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="p-2 hover:bg-white/5 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-400 mb-6">
                Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                >
                  Delete Account
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SettingsPage; 