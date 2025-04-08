import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, MessageSquare, Phone, Star, 
  Bell, FileText, Clock, CheckCircle2 
} from 'lucide-react';

const getNotificationIcon = (type) => {
  switch (type) {
    case 'new_role':
      return <Star className="w-5 h-5" />;
    case 'role_update':
      return <FileText className="w-5 h-5" />;
    case 'message':
      return <MessageSquare className="w-5 h-5" />;
    case 'call_alert':
      return <Phone className="w-5 h-5" />;
    case 'system':
      return <Bell className="w-5 h-5" />;
    default:
      return <Bell className="w-5 h-5" />;
  }
};

const getNotificationColor = (type) => {
  switch (type) {
    case 'new_role':
      return 'text-yellow-400 bg-yellow-500/20';
    case 'role_update':
      return 'text-blue-400 bg-blue-500/20';
    case 'message':
      return 'text-green-400 bg-green-500/20';
    case 'call_alert':
      return 'text-purple-400 bg-purple-500/20';
    case 'system':
      return 'text-gray-400 bg-gray-500/20';
    default:
      return 'text-gray-400 bg-gray-500/20';
  }
};

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;
  
  // Less than 24 hours
  if (diff < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(diff / (60 * 60 * 1000));
    if (hours < 1) {
      const minutes = Math.floor(diff / (60 * 1000));
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    }
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  }
  
  // Less than 7 days
  if (diff < 7 * 24 * 60 * 60 * 1000) {
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  }
  
  // Otherwise, return the date
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const NotificationItem = ({ notification, onClick }) => {
  const { type, title, description, timestamp, source, isRead } = notification;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onClick={() => onClick(notification.id)}
      className={`group cursor-pointer ${
        !isRead ? 'bg-white/5' : 'bg-transparent'
      } hover:bg-white/5 rounded-xl border border-white/10 p-4 transition-colors`}
    >
      <div className="flex items-start space-x-4">
        {/* Icon */}
        <div className={`p-2 rounded-lg ${getNotificationColor(type)}`}>
          {getNotificationIcon(type)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className={`font-medium ${!isRead ? 'text-white' : 'text-gray-300'}`}>
                {title}
              </h3>
              <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                {description}
              </p>
            </div>
            
            {/* Timestamp */}
            <div className="flex items-center text-xs text-gray-500 ml-4">
              <Clock className="w-3 h-3 mr-1" />
              {formatTimestamp(timestamp)}
            </div>
          </div>

          {/* Source */}
          <div className="flex items-center mt-3">
            <img
              src={source.avatar}
              alt={source.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-gray-400 ml-2">
              {source.name}
              {source.type !== 'system' && (
                <span className="text-gray-500"> • {source.type}</span>
              )}
            </span>
          </div>
        </div>

        {/* Read Status */}
        {!isRead && (
          <div className="p-1 rounded-full bg-blue-500/20 text-blue-400">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

const NotificationList = ({ notifications, onNotificationClick }) => {
  if (notifications.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="p-3 bg-white/5 rounded-full w-12 h-12 mx-auto mb-4">
          <Bell className="w-6 h-6 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-300">No notifications</h3>
        <p className="text-gray-400 text-sm mt-1">
          You're all caught up! Check back later for updates.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {notifications.map(notification => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onClick={onNotificationClick}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationList; 