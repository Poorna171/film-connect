import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, MapPin, DollarSign, Users, 
  ChevronDown, ChevronUp, Eye, MessageSquare, 
  Phone, X, Check, Clock, Star
} from 'lucide-react';
import ThemedDropdown from '../ui/ThemedDropdown';

// Mock data for testing
const mockApplications = [
  {
    id: 1,
    role: {
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
      director: {
        id: 101,
        name: "Sarah Chen",
        avatar: "/images/default-profile.svg"
      }
    },
    status: "pending",
    appliedDate: "2023-11-15",
    lastUpdated: "2023-11-16",
    notes: "Waiting for callback"
  },
  {
    id: 2,
    role: {
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
      director: {
        id: 102,
        name: "Michael Rodriguez",
        avatar: "/images/default-profile.svg"
      }
    },
    status: "shortlisted",
    appliedDate: "2023-11-10",
    lastUpdated: "2023-11-14",
    notes: "Callback scheduled for next week"
  }
];

// Filter options
const statusOptions = [
  { id: 'all', label: 'All Applications' },
  { id: 'pending', label: 'Pending' },
  { id: 'shortlisted', label: 'Shortlisted' },
  { id: 'rejected', label: 'Rejected' },
  { id: 'withdrawn', label: 'Withdrawn' }
];

// Sort options
const sortOptions = [
  { id: 'newest', label: 'Newest First' },
  { id: 'oldest', label: 'Oldest First' },
  { id: 'deadline', label: 'Deadline' },
  { id: 'budget', label: 'Budget (High to Low)' },
  { id: 'budget_asc', label: 'Budget (Low to High)' }
];

const ApplicationList = () => {
  const [applications, setApplications] = useState(mockApplications);
  const [expandedApp, setExpandedApp] = useState(null);
  const [showActions, setShowActions] = useState({});
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const handleWithdraw = (applicationId) => {
    setApplications(applications.map(app => {
      if (app.id === applicationId) {
        return {
          ...app,
          status: 'withdrawn',
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return app;
    }));
  };

  const handleMessage = (directorId) => {
    // Implement messaging functionality
    console.log('Message director:', directorId);
  };

  const handleCall = (directorId) => {
    // Implement calling functionality
    console.log('Call director:', directorId);
  };

  const toggleExpand = (appId) => {
    setExpandedApp(expandedApp === appId ? null : appId);
  };

  const toggleActions = (appId) => {
    setShowActions(prev => ({
      ...prev,
      [appId]: !prev[appId]
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-400 bg-yellow-500/20';
      case 'shortlisted':
        return 'text-green-400 bg-green-500/20';
      case 'rejected':
        return 'text-red-400 bg-red-500/20';
      case 'withdrawn':
        return 'text-gray-400 bg-gray-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  // Filter and sort applications
  const filteredApplications = applications
    .filter(app => statusFilter === 'all' || app.status === statusFilter)
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.appliedDate) - new Date(a.appliedDate);
        case 'oldest':
          return new Date(a.appliedDate) - new Date(b.appliedDate);
        case 'deadline':
          return new Date(a.role.deadline) - new Date(b.role.deadline);
        case 'budget':
          return parseInt(b.role.budget.replace(/[^0-9]/g, '')) - 
                 parseInt(a.role.budget.replace(/[^0-9]/g, ''));
        case 'budget_asc':
          return parseInt(a.role.budget.replace(/[^0-9]/g, '')) - 
                 parseInt(b.role.budget.replace(/[^0-9]/g, ''));
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-6">
      {/* Filter and Sort Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <ThemedDropdown
          label="Filter by Status"
          options={statusOptions}
          value={statusFilter}
          onChange={setStatusFilter}
          variant="filter"
          placeholder="All Applications"
        />
        
        <ThemedDropdown
          label="Sort By"
          options={sortOptions}
          value={sortBy}
          onChange={setSortBy}
          variant="sort"
          placeholder="Newest First"
        />
      </div>

      {/* Applications List */}
      {filteredApplications.length === 0 ? (
        <div className="text-center py-12 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
          <div className="p-3 bg-white/5 rounded-full w-12 h-12 mx-auto mb-4">
            <Eye className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-300">No applications found</h3>
          <p className="text-gray-400 text-sm mt-1">
            {statusFilter === 'all' 
              ? "You haven't applied to any roles yet." 
              : `No ${statusOptions.find(opt => opt.id === statusFilter)?.label.toLowerCase()} applications.`}
          </p>
        </div>
      ) : (
        filteredApplications.map(application => (
          <motion.div
            key={application.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden"
          >
            {/* Application Header */}
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-3">
                    <h3 className="text-xl font-bold">{application.role.title}</h3>
                    {application.role.isFeatured && (
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        Featured
                      </span>
                    )}
                    <span className={`px-2 py-1 rounded-full text-sm flex items-center ${getStatusColor(application.status)}`}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-400 mt-1">{application.role.genre}</p>
                </div>

                <div className="relative">
                  <button
                    onClick={() => toggleActions(application.id)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <ChevronDown className={`w-5 h-5 transform transition-transform ${showActions[application.id] ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {showActions[application.id] && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-56 bg-[#1A1F2E] rounded-lg shadow-lg border border-white/10 overflow-hidden z-10"
                      >
                        <div className="p-2 bg-gradient-to-r from-fuchsia-900/50 to-blue-900/50 border-b border-white/10">
                          <h4 className="text-sm font-medium text-white">Actions</h4>
                        </div>
                        <div className="py-1">
                          <button
                            onClick={() => handleMessage(application.role.director.id)}
                            className="w-full px-4 py-3 text-left hover:bg-white/5 flex items-center group"
                          >
                            <div className="p-2 rounded-full bg-blue-500/20 text-blue-400 mr-3 group-hover:bg-blue-500/30 transition-colors">
                              <MessageSquare className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="block text-white font-medium">Message Director</span>
                              <span className="text-xs text-gray-400">Send a message to {application.role.director.name}</span>
                            </div>
                          </button>
                          <button
                            onClick={() => handleCall(application.role.director.id)}
                            className="w-full px-4 py-3 text-left hover:bg-white/5 flex items-center group"
                          >
                            <div className="p-2 rounded-full bg-green-500/20 text-green-400 mr-3 group-hover:bg-green-500/30 transition-colors">
                              <Phone className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="block text-white font-medium">Call Director</span>
                              <span className="text-xs text-gray-400">Schedule a call with {application.role.director.name}</span>
                            </div>
                          </button>
                          <button
                            onClick={() => handleWithdraw(application.id)}
                            className="w-full px-4 py-3 text-left hover:bg-red-500/10 flex items-center group"
                          >
                            <div className="p-2 rounded-full bg-red-500/20 text-red-400 mr-3 group-hover:bg-red-500/30 transition-colors">
                              <X className="w-4 h-4" />
                            </div>
                            <div>
                              <span className="block text-red-400 font-medium">Withdraw Application</span>
                              <span className="text-xs text-gray-400">Remove your application for this role</span>
                            </div>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Role Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="flex items-center text-gray-300">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Deadline: {application.role.deadline}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{application.role.location}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <DollarSign className="w-4 h-4 mr-2" />
                  <span>{application.role.budget}</span>
                </div>
              </div>

              {/* Application Timeline */}
              <div className="flex items-center space-x-6 mt-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Applied: {application.appliedDate}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Last Updated: {application.lastUpdated}</span>
                </div>
              </div>

              {/* Director Info */}
              <div className="mt-4 flex items-center space-x-4">
                <img 
                  src={application.role.director.avatar} 
                  alt={application.role.director.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{application.role.director.name}</p>
                  <p className="text-sm text-gray-400">Director</p>
                </div>
                <div className="ml-auto flex space-x-2">
                  <button
                    onClick={() => handleMessage(application.role.director.id)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <MessageSquare className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleCall(application.role.director.id)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Expand/Collapse Button */}
              <button
                onClick={() => toggleExpand(application.id)}
                className="mt-4 flex items-center text-sm text-gray-400 hover:text-white transition-colors"
              >
                {expandedApp === application.id ? (
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
              {expandedApp === application.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-white/10"
                >
                  <div className="p-6 space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Role Description</h4>
                      <p className="text-gray-400">{application.role.description}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Requirements</h4>
                      <p className="text-gray-400">{application.role.requirements}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Additional Details</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center text-gray-400">
                          <Users className="w-4 h-4 mr-2" />
                          <span>Cast Size: {application.role.castSize}</span>
                        </div>
                        <div className="flex items-center text-gray-400">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>Duration: {application.role.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Application Notes</h4>
                      <p className="text-gray-400">{application.notes}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))
      )}
    </div>
  );
};

export default ApplicationList; 