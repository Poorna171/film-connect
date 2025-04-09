import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaSearch, FaFilter, FaEye } from 'react-icons/fa';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';

const Applications = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editForm, setEditForm] = useState({
    coverLetter: '',
    resume: '',
    availability: ''
  });

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = () => {
    try {
      const savedApplications = JSON.parse(localStorage.getItem('applications') || '[]');
      const userApplications = savedApplications.filter(app => app.actorId === currentUser.uid);
      setApplications(userApplications);
    } catch (error) {
      console.error('Error loading applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (application) => {
    setSelectedApplication(application);
    setEditForm({
      coverLetter: application.coverLetter,
      resume: application.resume,
      availability: application.availability
    });
    setShowEditModal(true);
  };

  const handleDelete = (application) => {
    setSelectedApplication(application);
    setShowDeleteModal(true);
  };

  const handleViewDetails = (application) => {
    navigate(`/actor/applications/${application.id}`);
  };

  const handleSaveEdit = () => {
    try {
      const savedApplications = JSON.parse(localStorage.getItem('applications') || '[]');
      const updatedApplications = savedApplications.map(app => {
        if (app.id === selectedApplication.id) {
          return {
            ...app,
            ...editForm,
            updatedAt: new Date().toISOString()
          };
        }
        return app;
      });
      localStorage.setItem('applications', JSON.stringify(updatedApplications));
      setApplications(updatedApplications.filter(app => app.actorId === currentUser.uid));
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating application:', error);
    }
  };

  const handleConfirmDelete = () => {
    try {
      const savedApplications = JSON.parse(localStorage.getItem('applications') || '[]');
      const updatedApplications = savedApplications.filter(app => app.id !== selectedApplication.id);
      localStorage.setItem('applications', JSON.stringify(updatedApplications));
      setApplications(updatedApplications.filter(app => app.actorId === currentUser.uid));
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.roleTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || app.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <DashboardLayout userRole="actor">
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fuchsia-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="actor">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold">My Applications</h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4">
          <AnimatePresence>
            {filteredApplications.map((application) => (
              <motion.div
                key={application.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6"
              >
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold">{application.roleTitle}</h2>
                    <p className="text-gray-400">{application.portfolio?.bio}</p>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        application.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-500' :
                        application.status === 'Accepted' ? 'bg-green-500/20 text-green-500' :
                        'bg-red-500/20 text-red-500'
                      }`}>
                        {application.status}
                      </span>
                      <span className="text-sm text-gray-400">
                        Applied on {new Date(application.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleViewDetails(application)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleEdit(application)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                      title="Edit Application"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(application)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      title="Delete Application"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Edit Modal */}
        <AnimatePresence>
          {showEditModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#0A0F1C] rounded-xl border border-white/10 p-6 max-w-2xl w-full"
              >
                <h2 className="text-xl font-bold mb-4">Edit Application</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSaveEdit(); }} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Cover Letter
                    </label>
                    <textarea
                      value={editForm.coverLetter}
                      onChange={(e) => setEditForm({ ...editForm, coverLetter: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                      rows="4"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Resume URL
                    </label>
                    <input
                      type="url"
                      value={editForm.resume}
                      onChange={(e) => setEditForm({ ...editForm, resume: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Availability
                    </label>
                    <input
                      type="text"
                      value={editForm.availability}
                      onChange={(e) => setEditForm({ ...editForm, availability: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                    />
                  </div>
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowEditModal(false)}
                      className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Modal */}
        <AnimatePresence>
          {showDeleteModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#0A0F1C] rounded-xl border border-white/10 p-6 max-w-md w-full"
              >
                <h2 className="text-xl font-bold mb-4">Delete Application</h2>
                <p className="text-gray-400 mb-6">
                  Are you sure you want to delete this application? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};

export default Applications; 