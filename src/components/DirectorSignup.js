import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUpload, FaCamera, FaVideo, FaArrowLeft, FaCheck, FaBriefcase } from 'react-icons/fa';

const DirectorSignup = ({ onBack, onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    bio: '',
    genres: [],
    profileImage: null,
    portfolioVideo: null,
    pastProjects: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        [type]: file
      });
    }
  };

  const handleGenreToggle = (genre) => {
    const updatedGenres = formData.genres.includes(genre)
      ? formData.genres.filter(g => g !== genre)
      : [...formData.genres, genre];
    
    setFormData({
      ...formData,
      genres: updatedGenres
    });
  };

  const commonGenres = [
    'Drama', 'Comedy', 'Action', 'Romance', 'Horror', 
    'Sci-Fi', 'Documentary', 'Animation', 'Thriller', 'Musical'
  ];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-800">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Christopher"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Nolan"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="chris.nolan@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Next
              </button>
            </div>
          </motion.div>
        );
      
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-800">Profile & Genres</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent h-32"
                placeholder="Tell us about yourself and your directing experience..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Genres</label>
              <div className="flex flex-wrap gap-2">
                {commonGenres.map(genre => (
                  <button
                    key={genre}
                    onClick={() => handleGenreToggle(genre)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      formData.genres.includes(genre)
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Next
              </button>
            </div>
          </motion.div>
        );
      
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-800">Media Upload</h2>
            
            {/* Profile Image Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <div className="flex flex-col items-center">
                {formData.profileImage ? (
                  <div className="relative w-32 h-32 mb-4">
                    <img
                      src={URL.createObjectURL(formData.profileImage)}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full"
                    />
                    <button
                      onClick={() => setFormData({...formData, profileImage: null})}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <FaCheck className="text-xs" />
                    </button>
                  </div>
                ) : (
                  <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                    <FaCamera className="text-4xl text-gray-400" />
                  </div>
                )}
                <label className="cursor-pointer">
                  <span className="block text-sm font-medium text-gray-700 mb-1">Profile Image</span>
                  <span className="px-4 py-2 bg-red-100 text-red-600 rounded-lg inline-block">
                    <FaUpload className="inline mr-2" />
                    Upload Photo
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'profileImage')}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            
            {/* Portfolio Video Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <div className="flex flex-col items-center">
                {formData.portfolioVideo ? (
                  <div className="w-full max-w-md mb-4">
                    <video
                      src={URL.createObjectURL(formData.portfolioVideo)}
                      controls
                      className="w-full rounded-lg"
                    />
                    <button
                      onClick={() => setFormData({...formData, portfolioVideo: null})}
                      className="mt-2 px-3 py-1 bg-red-500 text-white rounded-lg text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="w-full max-w-md h-40 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                    <FaVideo className="text-4xl text-gray-400" />
                  </div>
                )}
                <label className="cursor-pointer">
                  <span className="block text-sm font-medium text-gray-700 mb-1">Portfolio / Showreel</span>
                  <span className="px-4 py-2 bg-red-100 text-red-600 rounded-lg inline-block">
                    <FaUpload className="inline mr-2" />
                    Upload Video
                  </span>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleFileUpload(e, 'portfolioVideo')}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            
            {/* Past Projects */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Past Projects</h3>
              <div className="space-y-4">
                {formData.pastProjects.map((project, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">{project.title}</h4>
                      <p className="text-sm text-gray-600">{project.year}</p>
                    </div>
                    <button
                      onClick={() => {
                        const updatedProjects = [...formData.pastProjects];
                        updatedProjects.splice(index, 1);
                        setFormData({...formData, pastProjects: updatedProjects});
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newProject = { title: 'New Project', year: new Date().getFullYear() };
                    setFormData({
                      ...formData,
                      pastProjects: [...formData.pastProjects, newProject]
                    });
                  }}
                  className="flex items-center text-red-600 hover:text-red-800"
                >
                  <FaBriefcase className="mr-2" />
                  Add Past Project
                </button>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => onComplete(formData)}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Complete Signup
              </button>
            </div>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-xl p-8">
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800 mr-4"
          >
            <FaArrowLeft />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Director Signup</h1>
        </div>
        
        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                s === step ? 'bg-red-600 text-white' : 
                s < step ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {s < step ? <FaCheck /> : s}
              </div>
              {s < 3 && (
                <div className={`h-1 w-16 mx-2 ${
                  s < step ? 'bg-green-500' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>
        
        {renderStep()}
      </div>
    </div>
  );
};

export default DirectorSignup; 