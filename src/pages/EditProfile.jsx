import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Camera, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';

const EditProfile = ({ userRole }) => {
  const navigate = useNavigate();
  const { currentUser, updateUserProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.displayName || '',
    bio: '',
    location: '',
    experience: '',
    skills: '',
    portfolio: '',
    email: currentUser?.email || '',
    phone: '',
    website: '',
    instagram: '',
    twitter: '',
    linkedin: ''
  });

  const [avatar, setAvatar] = useState(currentUser?.photoURL || '/images/default-avatar.png');
  const [coverImage, setCoverImage] = useState('/images/default-cover.jpg');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load user data from localStorage
    const loadUserData = () => {
      const savedData = localStorage.getItem(`user_${currentUser?.uid}`);
      if (savedData) {
        const userData = JSON.parse(savedData);
        setFormData(prev => ({
          ...prev,
          ...userData
        }));
        if (userData.avatar) setAvatar(userData.avatar);
        if (userData.coverImage) setCoverImage(userData.coverImage);
      }
    };

    loadUserData();
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === 'avatar') {
        setAvatar(reader.result);
      } else {
        setCoverImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get existing user data
      const existingData = JSON.parse(localStorage.getItem(`user_${currentUser.uid}`) || '{}');

      // Update user data
      const updatedData = {
        ...existingData,
        displayName: formData.name,
        bio: formData.bio,
        location: formData.location,
        experience: formData.experience,
        skills: formData.skills,
        portfolio: formData.portfolio,
        email: formData.email,
        phone: formData.phone,
        website: formData.website || '',
        social: {
          ...existingData.social,
          instagram: formData.instagram || '',
          twitter: formData.twitter || '',
          linkedin: formData.linkedin || '',
          website: formData.website || ''
        },
        avatar: avatar || existingData.avatar,
        coverImage: coverImage || existingData.coverImage,
        updatedAt: new Date().toISOString()
      };

      // Save to localStorage
      localStorage.setItem(`user_${currentUser.uid}`, JSON.stringify(updatedData));

      // Update auth context
      if (updateUserProfile) {
        await updateUserProfile({
          displayName: formData.name,
          photoURL: avatar || existingData.avatar
        });
      }

      toast.success('Profile updated successfully!');
      navigate(-1);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">Edit Profile</h1>
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Photo */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-300">Profile Photo</label>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={avatar || formData.avatar}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-2 border-fuchsia-500"
                />
                <label className="absolute bottom-0 right-0 p-1.5 rounded-full bg-fuchsia-500 hover:bg-fuchsia-600 transition-colors cursor-pointer">
                  <Camera className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, 'avatar')}
                    disabled={isLoading}
                  />
                </label>
              </div>
              <div>
                <p className="text-sm text-gray-400">Upload a new profile photo</p>
                <p className="text-xs text-gray-500">Recommended size: 400x400px</p>
              </div>
            </div>
          </div>

          {/* Cover Photo */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-300">Cover Photo</label>
            <div className="relative h-48 rounded-xl overflow-hidden">
              <img
                src={coverImage || formData.coverImage}
                alt="Cover"
                className="w-full h-full object-cover"
              />
              <label className="absolute bottom-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors cursor-pointer">
                <Camera className="w-5 h-5" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, 'cover')}
                  disabled={isLoading}
                />
              </label>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-fuchsia-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-fuchsia-500"
                required
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-fuchsia-500"
              required
            />
          </div>

          {/* Experience & Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Experience</label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-fuchsia-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Skills</label>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-fuchsia-500"
                required
              />
            </div>
          </div>

          {/* Portfolio */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Portfolio URL</label>
            <input
              type="url"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-fuchsia-500"
              placeholder="https://your-portfolio.com"
            />
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-fuchsia-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-fuchsia-500"
                required
              />
            </div>
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Website (Optional)</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-fuchsia-500"
              placeholder="https://your-website.com"
            />
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Instagram</label>
              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-fuchsia-500"
                placeholder="@username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Twitter</label>
              <input
                type="text"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-fuchsia-500"
                placeholder="@username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn</label>
              <input
                type="text"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-fuchsia-500"
                placeholder="username"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <motion.button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-fuchsia-500 hover:bg-fuchsia-600 rounded-lg flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/20 rounded-full animate-spin border-t-white" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Save Changes</span>
                </>
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile; 