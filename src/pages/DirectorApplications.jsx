import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaTimes, FaPhone, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';

const DirectorApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const response = await fetch(`/api/applications/director/${currentUser.uid}`);
      if (!response.ok) throw new Error('Failed to fetch applications');
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error('Error loading applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update application status');

      // Update the local state without refreshing
      setApplications(applications.map(app => 
        app.id === applicationId 
          ? { ...app, status: newStatus }
          : app
      ));
    } catch (err) {
      console.error('Error updating application status:', err);
      setError('Failed to update application status');
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.actorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.roleTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <DashboardLayout userRole="director">
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fuchsia-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout userRole="director">
        <div className="text-center text-red-500">{error}</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="director">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Role Applications</h1>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search applications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 outline-none transition-all"
            />
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 outline-none transition-all"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredApplications.map((application) => (
              <motion.div
                key={application.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-fuchsia-500/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-r from-fuchsia-500 to-blue-600">
                    <img
                      src={application.actorPhoto || 'https://via.placeholder.com/150'}
                      alt={application.actorName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-1">{application.actorName}</h3>
                    <p className="text-gray-400 mb-2">{application.roleTitle}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        application.status === 'accepted' ? 'bg-green-500/20 text-green-400' :
                        application.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <p className="text-gray-300 text-sm line-clamp-3">{application.coverLetter}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>Availability: {application.availability}</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStatusChange(application.id, 'accepted')}
                      className={`p-2 rounded-lg ${
                        application.status === 'accepted'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-white/5 text-gray-400 hover:bg-green-500/20 hover:text-green-400'
                      } transition-colors`}
                      disabled={application.status === 'accepted'}
                    >
                      <FaCheck />
                    </button>
                    <button
                      onClick={() => handleStatusChange(application.id, 'rejected')}
                      className={`p-2 rounded-lg ${
                        application.status === 'rejected'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-white/5 text-gray-400 hover:bg-red-500/20 hover:text-red-400'
                      } transition-colors`}
                      disabled={application.status === 'rejected'}
                    >
                      <FaTimes />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => window.location.href = `tel:${application.phone}`}
                      className="p-2 rounded-lg bg-white/5 text-gray-400 hover:bg-blue-500/20 hover:text-blue-400 transition-colors"
                    >
                      <FaPhone />
                    </button>
                    <button
                      onClick={() => window.location.href = `mailto:${application.email}`}
                      className="p-2 rounded-lg bg-white/5 text-gray-400 hover:bg-blue-500/20 hover:text-blue-400 transition-colors"
                    >
                      <FaEnvelope />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No applications found</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DirectorApplications; 