import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, Plus, Calendar, MapPin, DollarSign, 
  Users, Clock, Tag, Star, Zap
} from 'lucide-react';

const AddRoleForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    deadline: '',
    location: '',
    budget: '',
    castSize: '',
    duration: '',
    description: '',
    requirements: '',
    isFeatured: false,
    isBoosted: false
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.genre) newErrors.genre = 'Genre is required';
    if (!formData.deadline) newErrors.deadline = 'Deadline is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.description) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Add New Role</h2>
        <button 
          onClick={onCancel}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Role Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full bg-white/5 border ${errors.title ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-500`}
              placeholder="e.g., Lead Actor in Drama Series"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Genre
            </label>
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className={`w-full bg-white/5 border ${errors.genre ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-500`}
            >
              <option value="">Select Genre</option>
              <option value="Drama">Drama</option>
              <option value="Comedy">Comedy</option>
              <option value="Action">Action</option>
              <option value="Thriller">Thriller</option>
              <option value="Horror">Horror</option>
              <option value="Romance">Romance</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Documentary">Documentary</option>
            </select>
            {errors.genre && (
              <p className="mt-1 text-sm text-red-500">{errors.genre}</p>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Deadline
            </label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className={`w-full bg-white/5 border ${errors.deadline ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-500`}
            />
            {errors.deadline && (
              <p className="mt-1 text-sm text-red-500">{errors.deadline}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <MapPin className="w-4 h-4 inline mr-2" />
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`w-full bg-white/5 border ${errors.location ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-500`}
              placeholder="e.g., Los Angeles, CA"
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-500">{errors.location}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <DollarSign className="w-4 h-4 inline mr-2" />
              Budget
            </label>
            <input
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              placeholder="e.g., $5,000/day"
            />
          </div>
        </div>

        {/* Additional Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Users className="w-4 h-4 inline mr-2" />
              Cast Size
            </label>
            <input
              type="number"
              name="castSize"
              value={formData.castSize}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              placeholder="e.g., 5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Clock className="w-4 h-4 inline mr-2" />
              Duration
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              placeholder="e.g., 3 months"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Tag className="w-4 h-4 inline mr-2" />
              Tags
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              placeholder="e.g., action, stunts, drama"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className={`w-full bg-white/5 border ${errors.description ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-500`}
            placeholder="Describe the role, project, and requirements..."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description}</p>
          )}
        </div>

        {/* Requirements */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Requirements
          </label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            rows="4"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            placeholder="List specific requirements for the role..."
          />
        </div>

        {/* Options */}
        <div className="flex items-center space-x-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-fuchsia-500 rounded border-white/10 bg-white/5"
            />
            <span className="flex items-center text-sm text-gray-300">
              <Star className="w-4 h-4 mr-2 text-yellow-500" />
              Mark as Featured
            </span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              name="isBoosted"
              checked={formData.isBoosted}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-fuchsia-500 rounded border-white/10 bg-white/5"
            />
            <span className="flex items-center text-sm text-gray-300">
              <Zap className="w-4 h-4 mr-2 text-blue-500" />
              Boost Visibility
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-fuchsia-500 to-blue-600 hover:from-fuchsia-600 hover:to-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5 inline mr-2" />
            Add Role
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddRoleForm; 