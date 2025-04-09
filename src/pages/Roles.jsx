import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaBriefcase, FaMapMarker, FaCalendar, FaClock, FaPlus } from 'react-icons/fa';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    try {
      // Load roles from localStorage
      const savedRoles = localStorage.getItem('roles');
      if (savedRoles) {
        setRoles(JSON.parse(savedRoles));
      }
    } catch (err) {
      console.error('Error loading roles:', err);
      setError('Failed to load roles');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddRole = async (roleData) => {
    try {
      const newRole = {
        id: Date.now(),
        ...roleData,
        status: 'open',
        postedDate: new Date().toISOString(),
        directorId: currentUser.uid
      };

      const updatedRoles = [...roles, newRole];
      localStorage.setItem('roles', JSON.stringify(updatedRoles));
      setRoles(updatedRoles);
      setShowAddRoleModal(false);
    } catch (err) {
      console.error('Error adding role:', err);
      setError('Failed to add role');
    }
  };

  const handleApply = (role) => {
    navigate(`/actor/roles/${role.id}/apply`);
  };

  if (loading) {
    return (
      <DashboardLayout userRole={currentUser?.userType || 'actor'}>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fuchsia-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout userRole={currentUser?.userType || 'actor'}>
        <div className="text-center text-red-500">{error}</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole={currentUser?.userType || 'actor'}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            {currentUser?.userType === 'actor' ? 'Available Roles' : 'Manage Roles'}
          </h1>
          {currentUser?.userType === 'director' && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAddRoleModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center"
            >
              <FaPlus className="w-4 h-4 mr-2" />
              Add Role
            </motion.button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden"
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
                
                <p className="text-gray-400 mt-4">{role.description}</p>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-gray-400">
                    <FaMapMarker className="mr-2" />
                    <span>{role.location}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <FaCalendar className="mr-2" />
                    <span>Posted: {new Date(role.postedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <FaClock className="mr-2" />
                    <span>Deadline: {new Date(role.deadline).toLocaleDateString()}</span>
                  </div>
                </div>

                {currentUser?.userType === 'actor' && role.status === 'open' && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleApply(role)}
                    className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Apply Now
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {showAddRoleModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#1A1F2C] rounded-xl p-6 max-w-lg w-full mx-4"
              >
                <h2 className="text-xl font-bold mb-4">Add New Role</h2>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleAddRole({
                    title: e.target.title.value,
                    description: e.target.description.value,
                    location: e.target.location.value,
                    deadline: e.target.deadline.value,
                    requirements: e.target.requirements.value,
                    compensation: e.target.compensation.value
                  });
                }}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Role Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                        placeholder="Enter role title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Description
                      </label>
                      <textarea
                        name="description"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                        rows="4"
                        placeholder="Describe the role and responsibilities"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                        placeholder="Enter location"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Application Deadline
                      </label>
                      <input
                        type="date"
                        name="deadline"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Requirements
                      </label>
                      <textarea
                        name="requirements"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                        rows="3"
                        placeholder="List the requirements for this role"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Compensation
                      </label>
                      <input
                        type="text"
                        name="compensation"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                        placeholder="Enter compensation details"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowAddRoleModal(false)}
                      className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Add Role
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};

export default Roles; 