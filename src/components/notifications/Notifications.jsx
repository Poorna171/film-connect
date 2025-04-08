import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check, Filter, X } from 'lucide-react';
import NotificationList from './NotificationList';
import FilterBar from './FilterBar';

// Mock data for notifications
const mockNotifications = [
  {
    id: 1,
    type: 'new_role',
    title: 'New Role Posted in "Midnight Echo"',
    description: 'Sarah Chen posted a new lead role for a psychological thriller',
    timestamp: '2024-02-20T10:30:00Z',
    source: {
      id: 101,
      name: 'Sarah Chen',
      avatar: '/images/default-profile.svg',
      type: 'director'
    },
    isRead: false,
    roleId: 501
  },
  {
    id: 2,
    type: 'role_update',
    title: 'Deadline Extended for "Urban Legends"',
    description: 'The application deadline has been extended to March 15th',
    timestamp: '2024-02-19T15:45:00Z',
    source: {
      id: 102,
      name: 'Michael Rodriguez',
      avatar: '/images/default-profile.svg',
      type: 'director'
    },
    isRead: true,
    roleId: 502
  },
  {
    id: 3,
    type: 'message',
    title: 'New Message from Sarah Chen',
    description: 'Hi! I saw your profile and would like to discuss a role...',
    timestamp: '2024-02-19T09:15:00Z',
    source: {
      id: 101,
      name: 'Sarah Chen',
      avatar: '/images/default-profile.svg',
      type: 'director'
    },
    isRead: false,
    messageId: 301
  },
  {
    id: 4,
    type: 'call_alert',
    title: 'Call Request from Michael Rodriguez',
    description: 'Would like to schedule a call to discuss your application',
    timestamp: '2024-02-18T16:20:00Z',
    source: {
      id: 102,
      name: 'Michael Rodriguez',
      avatar: '/images/default-profile.svg',
      type: 'director'
    },
    isRead: false,
    callId: 401
  },
  {
    id: 5,
    type: 'system',
    title: 'Profile View Milestone',
    description: 'Your profile has been viewed 100 times this week!',
    timestamp: '2024-02-18T12:00:00Z',
    source: {
      id: 0,
      name: 'FilmConnect',
      avatar: '/images/logo.svg',
      type: 'system'
    },
    isRead: true
  }
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      isRead: true
    })));
  };

  const handleNotificationClick = (notificationId) => {
    setNotifications(notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, isRead: true }
        : notification
    ));
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    return notification.type === filter;
  });

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-fuchsia-900/50 to-blue-900/50 rounded-lg">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Notifications</h1>
              <p className="text-gray-400 text-sm">
                {unreadCount} unread {unreadCount === 1 ? 'notification' : 'notifications'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <Filter className="w-5 h-5" />
            </button>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors flex items-center space-x-2"
              >
                <Check className="w-4 h-4" />
                <span>Mark all as read</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Bar */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <FilterBar
                currentFilter={filter}
                onFilterChange={setFilter}
                onClose={() => setShowFilters(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification List */}
        <NotificationList
          notifications={filteredNotifications}
          onNotificationClick={handleNotificationClick}
        />
      </div>
    </div>
  );
};

export default Notifications; 