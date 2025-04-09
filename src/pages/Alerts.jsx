import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBell, FaCheck, FaTimes, FaInfo } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = () => {
    try {
      // For now, using localStorage. In production, this would be an API call
      const storedAlerts = JSON.parse(localStorage.getItem('alerts')) || [];
      const userAlerts = storedAlerts.filter(alert => alert.userId === currentUser.uid);
      setAlerts(userAlerts);
    } catch (error) {
      console.error('Error loading alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = (alertId) => {
    const updatedAlerts = alerts.map(alert => {
      if (alert.id === alertId) {
        return { ...alert, read: true };
      }
      return alert;
    });
    setAlerts(updatedAlerts);
    localStorage.setItem('alerts', JSON.stringify(updatedAlerts));
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'success':
        return <FaCheck className="w-5 h-5 text-green-400" />;
      case 'error':
        return <FaTimes className="w-5 h-5 text-red-400" />;
      default:
        return <FaInfo className="w-5 h-5 text-blue-400" />;
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/20 text-green-400';
      case 'error':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-blue-500/20 text-blue-400';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fuchsia-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-fuchsia-500 to-blue-600 bg-clip-text text-transparent">
          Alerts
        </h1>
        <div className="flex items-center gap-2">
          <FaBell className="w-6 h-6 text-fuchsia-500" />
          <span className="text-gray-400">
            {alerts.filter(alert => !alert.read).length} unread
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {alerts.length > 0 ? (
            alerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`p-4 rounded-xl border ${
                  alert.read ? 'bg-white/5 border-white/10' : 'bg-white/10 border-fuchsia-500/50'
                } transition-all`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${getAlertColor(alert.type)}`}>
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">{alert.title}</h3>
                    <p className="text-gray-400 mb-2">{alert.message}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {new Date(alert.timestamp).toLocaleDateString()}
                      </span>
                      {!alert.read && (
                        <button
                          onClick={() => handleMarkAsRead(alert.id)}
                          className="text-sm text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <FaBell className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No alerts yet</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Alerts; 