import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaEdit, FaTrash, FaExternalLinkAlt } from 'react-icons/fa';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';

const ApplicationDetails = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    loadApplication();
  }, [applicationId]);

  const loadApplication = () => {
    try {
      const savedApplications = JSON.parse(localStorage.getItem('applications') || '[]');
      const app = savedApplications.find(a => a.id === parseInt(applicationId));
      if (!app) throw new Error('Application not found');
      if (app.actorId !== currentUser.uid) throw new Error('Unauthorized access');
      setApplication(app);
    } catch (error) {
      console.error('Error loading application:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    try {
      const savedApplications = JSON.parse(localStorage.getItem('applications') || '[]');
      const updatedApplications = savedApplications.filter(app => app.id !== parseInt(applicationId));
      localStorage.setItem('applications', JSON.stringify(updatedApplications));
      navigate('/actor/applications');
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  if (loading) {
    return (
      <DashboardLayout userRole="actor">
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fuchsia-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout userRole="actor">
        <div className="max-w-4xl mx-auto space-y-6">
          <button
            onClick={() => navigate('/actor/applications')}
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <FaArrowLeft className="w-4 h-4 mr-2" />
            Back to Applications
          </button>
          <div className="text-center text-red-500">{error}</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="actor">
      <div className="max-w-4xl mx-auto space-y-6">
        <button
          onClick={() => navigate('/actor/applications')}
          className="flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <FaArrowLeft className="w-4 h-4 mr-2" />
          Back to Applications
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold">{application.roleTitle}</h1>
              <div className="flex items-center gap-2 mt-2">
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
                onClick={() => navigate(`/actor/applications/${application.id}/edit`)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="Edit Application"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                title="Delete Application"
              >
                <FaTrash />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Cover Letter</h2>
              <p className="text-gray-400 whitespace-pre-wrap">{application.coverLetter}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Resume</h2>
              <div className="flex items-center gap-2">
                <a
                  href={application.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fuchsia-500 hover:text-fuchsia-400 flex items-center gap-2"
                >
                  View Resume <FaExternalLinkAlt className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Availability</h2>
              <p className="text-gray-400">{application.availability}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Portfolio</h2>
              <div className="space-y-2">
                <p className="text-gray-400">{application.portfolio?.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {application.portfolio?.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Delete Modal */}
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
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ApplicationDetails; 