import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Edit, Trash, Star, Zap, Users, 
  Calendar, MapPin, DollarSign, ChevronDown,
  ChevronUp, Eye, MessageSquare, Phone
} from 'lucide-react';

// Mock data for testing
const mockRoles = [
  {
    id: 1,
    title: "Lead Actor in Drama Series",
    genre: "Drama",
    deadline: "2023-12-31",
    location: "Los Angeles, CA",
    budget: "$5,000/day",
    castSize: "5",
    duration: "3 months",
    description: "Seeking a strong dramatic actor for the lead role in an emotional story about family and redemption.",
    requirements: "5+ years of acting experience, theater background preferred",
    isFeatured: true,
    isBoosted: false,
    applicants: 12,
    views: 156
  },
  {
    id: 2,
    title: "Supporting Role in Action Film",
    genre: "Action",
    deadline: "2024-01-15",
    location: "New York, NY",
    budget: "$3,000/day",
    castSize: "8",
    duration: "2 months",
    description: "Looking for a physically fit actor for intense action sequences and dramatic scenes.",
    requirements: "Stunt experience, martial arts training",
    isFeatured: false,
    isBoosted: true,
    applicants: 8,
    views: 98
  }
];

const RoleList = () => {
  const [roles, setRoles] = useState(mockRoles);
  const [expandedRole, setExpandedRole] = useState(null);
  const [showActions, setShowActions] = useState({});

  const handleEdit = (roleId) => {
    // Implement edit functionality
    console.log('Edit role:', roleId);
  };

  const handleDelete = (roleId) => {
    setRoles(roles.filter(role => role.id !== roleId));
  };

  const handleUpgrade = (roleId, type) => {
    setRoles(roles.map(role => {
      if (role.id === roleId) {
        return {
          ...role,
          [type]: !role[type]
        };
      }
      return role;
    }));
  };

  const toggleExpand = (roleId) => {
    setExpandedRole(expandedRole === roleId ? null : roleId);
  };

  const toggleActions = (roleId) => {
    setShowActions(prev => ({
      ...prev,
      [roleId]: !prev[roleId]
    }));
  };

  return (
    <div className="space-y-6">
      {roles.map(role => (
        <motion.div
          key={role.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden"
        >
          {/* Role Header */}
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-3">
                  <h3 className="text-xl font-bold">{role.title}</h3>
                  {role.isFeatured && (
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Featured
                    </span>
                  )}
                  {role.isBoosted && (
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm flex items-center">
                      <Zap className="w-4 h-4 mr-1" />
                      Boosted
                    </span>
                  )}
                </div>
                <p className="text-gray-400 mt-1">{role.genre}</p>
              </div>

              <div className="relative">
                <button
                  onClick={() => toggleActions(role.id)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <ChevronDown className={`w-5 h-5 transform transition-transform ${showActions[role.id] ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {showActions[role.id] && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-48 bg-[#1A1F2E] rounded-lg shadow-lg border border-white/10 overflow-hidden z-10"
                    >
                      <button
                        onClick={() => handleEdit(role.id)}
                        className="w-full px-4 py-2 text-left hover:bg-white/5 flex items-center"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Role
                      </button>
                      <button
                        onClick={() => handleUpgrade(role.id, 'isFeatured')}
                        className="w-full px-4 py-2 text-left hover:bg-white/5 flex items-center"
                      >
                        <Star className="w-4 h-4 mr-2" />
                        {role.isFeatured ? 'Remove Featured' : 'Mark as Featured'}
                      </button>
                      <button
                        onClick={() => handleUpgrade(role.id, 'isBoosted')}
                        className="w-full px-4 py-2 text-left hover:bg-white/5 flex items-center"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        {role.isBoosted ? 'Remove Boost' : 'Boost Visibility'}
                      </button>
                      <button
                        onClick={() => handleDelete(role.id)}
                        className="w-full px-4 py-2 text-left hover:bg-red-500/10 text-red-400 flex items-center"
                      >
                        <Trash className="w-4 h-4 mr-2" />
                        Delete Role
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Role Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="flex items-center text-gray-300">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Deadline: {role.deadline}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{role.location}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <DollarSign className="w-4 h-4 mr-2" />
                <span>{role.budget}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-6 mt-4 text-sm text-gray-400">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                <span>{role.applicants} applicants</span>
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                <span>{role.views} views</span>
              </div>
            </div>

            {/* Expand/Collapse Button */}
            <button
              onClick={() => toggleExpand(role.id)}
              className="mt-4 flex items-center text-sm text-gray-400 hover:text-white transition-colors"
            >
              {expandedRole === role.id ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-1" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-1" />
                  Show More
                </>
              )}
            </button>
          </div>

          {/* Expanded Content */}
          <AnimatePresence>
            {expandedRole === role.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-white/10"
              >
                <div className="p-6 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Description</h4>
                    <p className="text-gray-400">{role.description}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Requirements</h4>
                    <p className="text-gray-400">{role.requirements}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Additional Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center text-gray-400">
                        <Users className="w-4 h-4 mr-2" />
                        <span>Cast Size: {role.castSize}</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Duration: {role.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default RoleList; 