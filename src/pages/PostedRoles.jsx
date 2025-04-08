import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaMapMarkerAlt, FaCalendarAlt, FaVenusMars, 
  FaBirthdayCake, FaEdit, FaTrash, FaEye, FaFileAlt, FaImage,
  FaPlus, FaSearch, FaFilter
} from 'react-icons/fa';

const PostedRoles = () => {
  // Mock data for posted roles
  const [roles, setRoles] = useState([
    {
      id: '1',
      title: 'Lead Character in Drama Series',
      description: 'Looking for a charismatic actor to play the lead role in an upcoming drama series. The character is a complex individual with a troubled past who must overcome personal demons.',
      ageMin: 25,
      ageMax: 40,
      gender: 'Any',
      location: 'Los Angeles, CA',
      auditionDate: '2023-07-15',
      postedDate: '2023-06-01',
      applications: 12,
      status: 'Open',
      fileType: 'script',
      fileName: 'Character_Description.pdf'
    },
    {
      id: '2',
      title: 'Supporting Role in Action Film',
      description: 'Seeking a physically fit actor for a supporting role in an action-packed thriller. The character is a former military operative who assists the protagonist.',
      ageMin: 30,
      ageMax: 45,
      gender: 'Male',
      location: 'New York, NY',
      auditionDate: '2023-07-20',
      postedDate: '2023-06-05',
      applications: 8,
      status: 'Open',
      fileType: 'image',
      fileName: 'Character_Reference.jpg'
    },
    {
      id: '3',
      title: 'Antagonist in Mystery Film',
      description: 'Casting for a compelling antagonist in a psychological thriller. The character is sophisticated, manipulative, and has a hidden agenda that drives the plot.',
      ageMin: 35,
      ageMax: 50,
      gender: 'Any',
      location: 'Vancouver, BC',
      auditionDate: '2023-07-25',
      postedDate: '2023-06-10',
      applications: 15,
      status: 'Open',
      fileType: 'script',
      fileName: 'Character_Profile.pdf'
    },
    {
      id: '4',
      title: 'Female Lead in Romantic Comedy',
      description: 'Looking for a talented actress to play the female lead in a romantic comedy. The character is witty, independent, and finds herself in an unexpected situation.',
      ageMin: 25,
      ageMax: 35,
      gender: 'Female',
      location: 'Toronto, ON',
      auditionDate: '2023-07-30',
      postedDate: '2023-06-12',
      applications: 20,
      status: 'Open',
      fileType: 'image',
      fileName: 'Character_Visual.jpg'
    },
    {
      id: '5',
      title: 'Child Actor for Family Film',
      description: 'Seeking a talented child actor (8-12 years) for a heartwarming family film. The character is curious, adventurous, and brings joy to those around them.',
      ageMin: 8,
      ageMax: 12,
      gender: 'Any',
      location: 'Chicago, IL',
      auditionDate: '2023-08-05',
      postedDate: '2023-06-15',
      applications: 25,
      status: 'Open',
      fileType: 'script',
      fileName: 'Character_Details.pdf'
    },
    {
      id: '6',
      title: 'Elderly Character in Drama',
      description: 'Casting for a wise elderly character in a touching drama. The character has lived a full life and imparts wisdom to the younger generation.',
      ageMin: 65,
      ageMax: 80,
      gender: 'Any',
      location: 'San Francisco, CA',
      auditionDate: '2023-08-10',
      postedDate: '2023-06-18',
      applications: 10,
      status: 'Closed',
      fileType: 'script',
      fileName: 'Character_Background.pdf'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [showToast, setShowToast] = useState({ show: false, message: '', type: '' });

  // Filter roles based on status and search term
  const filteredRoles = roles.filter(role => {
    const matchesFilter = filter === 'all' || role.status.toLowerCase() === filter;
    const matchesSearch = role.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         role.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDelete = (id) => {
    setShowDeleteConfirm(id);
  };

  const confirmDelete = (id) => {
    setRoles(roles.filter(role => role.id !== id));
    setShowDeleteConfirm(null);
    setShowToast({ show: true, message: 'Role deleted successfully', type: 'success' });
    setTimeout(() => setShowToast({ show: false, message: '', type: '' }), 3000);
  };

  const handleEdit = (id) => {
    // In a real app, this would navigate to an edit page
    setShowToast({ show: true, message: 'Edit functionality coming soon', type: 'info' });
    setTimeout(() => setShowToast({ show: false, message: '', type: '' }), 3000);
  };

  const handleView = (id) => {
    // In a real app, this would show a detailed view
    setShowToast({ show: true, message: 'View functionality coming soon', type: 'info' });
    setTimeout(() => setShowToast({ show: false, message: '', type: '' }), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1C] via-[#1a1f3b] to-[#2a2f4b] text-white font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-fuchsia-500 to-blue-500 text-transparent bg-clip-text">
              🎭 My Posted Roles
            </h1>
            <p className="text-gray-300 mt-2">Manage and view all your casting calls</p>
          </div>
          <Link 
            to="/director/post-role"
            className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-gradient-to-r from-fuchsia-500 to-blue-500 text-white rounded-lg hover:from-fuchsia-600 hover:to-blue-600 transition duration-300 shadow-lg hover:shadow-fuchsia-500/25"
          >
            <FaPlus className="mr-2" />
            Post New Role
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex space-x-2 mb-4 md:mb-0">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition duration-300 ${
                filter === 'all' 
                  ? 'bg-gradient-to-r from-fuchsia-500 to-blue-500 text-white shadow-md' 
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              <FaFilter className="inline mr-2" />
              All
            </button>
            <button 
              onClick={() => setFilter('open')}
              className={`px-4 py-2 rounded-lg transition duration-300 ${
                filter === 'open' 
                  ? 'bg-gradient-to-r from-fuchsia-500 to-blue-500 text-white shadow-md' 
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              Open
            </button>
            <button 
              onClick={() => setFilter('closed')}
              className={`px-4 py-2 rounded-lg transition duration-300 ${
                filter === 'closed' 
                  ? 'bg-gradient-to-r from-fuchsia-500 to-blue-500 text-white shadow-md' 
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              Closed
            </button>
          </div>
          <div className="w-full md:w-64">
            <div className="relative">
              <input
                type="text"
                placeholder="Search roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition duration-300"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Roles List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredRoles.length > 0 ? (
              filteredRoles.map((role, index) => (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-fuchsia-500/50 transition duration-300 hover:shadow-lg hover:shadow-fuchsia-500/10"
                >
                  <div className="flex flex-col md:flex-row justify-between">
                    <div className="mb-4 md:mb-0">
                      <div className="flex items-center">
                        <h2 className="text-xl font-bold bg-gradient-to-r from-fuchsia-400 to-blue-400 text-transparent bg-clip-text">{role.title}</h2>
                        <span className={`ml-3 px-2 py-1 text-xs rounded-full ${
                          role.status === 'Open' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {role.status}
                        </span>
                      </div>
                      <p className="text-gray-300 mt-2 line-clamp-2">{role.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleView(role.id)}
                        className="p-2 bg-white/5 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition duration-300"
                        title="View Details"
                      >
                        <FaEye />
                      </button>
                      <button 
                        onClick={() => handleEdit(role.id)}
                        className="p-2 bg-white/5 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition duration-300"
                        title="Edit Role"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        onClick={() => handleDelete(role.id)}
                        className="p-2 bg-white/5 rounded-lg text-gray-300 hover:bg-white/10 hover:text-red-400 transition duration-300"
                        title="Delete Role"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center text-gray-300">
                      <FaVenusMars className="mr-2 text-fuchsia-400" />
                      <span>{role.gender}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <FaBirthdayCake className="mr-2 text-fuchsia-400" />
                      <span>{role.ageMin} - {role.ageMax} years</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <FaMapMarkerAlt className="mr-2 text-fuchsia-400" />
                      <span>{role.location}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <FaCalendarAlt className="mr-2 text-fuchsia-400" />
                      <span>Audition: {new Date(role.auditionDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center text-sm">
                    <div className="text-gray-400">
                      Posted on {new Date(role.postedDate).toLocaleDateString()}
                    </div>
                    <div className="text-fuchsia-400">
                      {role.applications} applications
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center text-sm text-gray-300">
                    {role.fileType === 'script' ? (
                      <FaFileAlt className="mr-2 text-fuchsia-400" />
                    ) : (
                      <FaImage className="mr-2 text-fuchsia-400" />
                    )}
                    <span className="truncate">{role.fileName}</span>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full bg-white/10 backdrop-blur-lg rounded-xl p-8 text-center"
              >
                <p className="text-gray-300">No roles found matching your criteria.</p>
                <Link 
                  to="/director/post-role"
                  className="mt-4 inline-flex items-center px-4 py-2 bg-gradient-to-r from-fuchsia-500 to-blue-500 text-white rounded-lg hover:from-fuchsia-600 hover:to-blue-600 transition duration-300"
                >
                  <FaPlus className="mr-2" />
                  Post Your First Role
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 max-w-md w-full border border-white/10"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-4">Confirm Deletion</h3>
              <p className="text-gray-300 mb-6">Are you sure you want to delete this role? This action cannot be undone.</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 bg-white/5 text-gray-300 rounded-lg hover:bg-white/10 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => confirmDelete(showDeleteConfirm)}
                  className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg ${
              showToast.type === 'success' 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
            }`}
          >
            {showToast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PostedRoles; 