import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Camera, 
  Upload, 
  Save, 
  X, 
  Instagram, 
  Twitter, 
  Linkedin,
  Globe,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Link as LinkIcon
} from 'lucide-react';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    profileImage: '/path/to/profile.jpg',
    coverImage: '/path/to/cover.jpg',
    bio: 'Passionate actor with 5 years of experience in theater and film.',
    location: 'Los Angeles, CA',
    phone: '+1 (123) 456-7890',
    email: 'john@example.com',
    website: 'www.johndoe.com',
    instagram: '@johndoe',
    twitter: '@johndoe',
    linkedin: 'johndoe',
    skills: ['Method Acting', 'Voice Acting', 'Stage Combat', 'Improvisation'],
    experience: [
      {
        role: 'Lead Actor',
        project: 'Hamlet',
        year: '2022',
        description: 'Performed as Hamlet in the modern adaptation of Shakespeare\'s classic.'
      }
    ]
  });

  const [newSkill, setNewSkill] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSave = () => {
    // Save logic here
    navigate('/actor/profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1C] via-[#1A1F3C] to-[#2A2F4C] text-white p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-fuchsia-500 to-blue-600 bg-clip-text text-transparent">
            Edit Profile
          </h1>
          <div className="flex space-x-4">
            <motion.button
              onClick={() => navigate('/actor/profile')}
              className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={handleSave}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-fuchsia-500 to-blue-600 hover:from-fuchsia-600 hover:to-blue-700 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Save className="w-5 h-5" />
              <span>Save Changes</span>
            </motion.button>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative h-48 rounded-xl bg-white/5 overflow-hidden group">
          <img
            src={formData.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <motion.button
              className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Upload className="w-5 h-5" />
              <span>Change Cover</span>
            </motion.button>
          </div>
        </div>

        {/* Profile Image */}
        <div className="relative w-32 h-32 -mt-16 ml-8 rounded-full bg-white/5 overflow-hidden ring-4 ring-[#0A0F1C] group">
          <img
            src={formData.profileImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <motion.button
              className="p-2 rounded-full bg-white/10 backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Camera className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Form Sections */}
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 rounded-lg px-4 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 rounded-lg pl-10 pr-4 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50"
                  />
                </div>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-1">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full bg-white/5 rounded-lg px-4 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 rounded-lg pl-10 pr-4 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 rounded-lg pl-10 pr-4 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Website</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 rounded-lg pl-10 pr-4 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Social Media</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Instagram</label>
                <div className="relative">
                  <Instagram className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 rounded-lg pl-10 pr-4 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Twitter</label>
                <div className="relative">
                  <Twitter className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 rounded-lg pl-10 pr-4 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">LinkedIn</label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 rounded-lg pl-10 pr-4 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a new skill"
                  className="flex-1 bg-white/5 rounded-lg px-4 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                />
                <motion.button
                  onClick={handleAddSkill}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-fuchsia-500 to-blue-600 hover:from-fuchsia-600 hover:to-blue-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Add
                </motion.button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="px-3 py-1 rounded-full bg-white/10 flex items-center space-x-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="w-4 h-4 rounded-full hover:bg-white/20 flex items-center justify-center"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage; 