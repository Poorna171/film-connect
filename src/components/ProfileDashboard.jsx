import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUser, FaEdit, FaMapMarkerAlt, FaStar, FaPlay, 
  FaHeart, FaComment, FaShare, FaEnvelope, FaBriefcase,
  FaFilm, FaTrophy, FaAward, FaTheaterMasks, FaGlobe,
  FaLinkedin, FaInstagram, FaTwitter, FaYoutube, FaCheck,
  FaCamera
} from 'react-icons/fa';

const ProfileDashboard = ({ userId, isOwnProfile, currentUser }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAvailable, setIsAvailable] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  // Hardcoded user data for immediate display
  const userData = {
    name: currentUser?.displayName || 'John Doe',
    role: currentUser?.userType === 'director' ? 'Director' : 'Actor',
    location: 'Los Angeles, CA',
    tagline: 'Chasing the spotlight 🎥',
    profileImage: '/images/default-profile.svg',
    coverImage: '/images/default-cover.svg',
    stats: {
      rolesPosted: 0,
      rolesApplied: 12,
      followers: 1243,
      following: 567,
      rating: 4.8
    },
    about: 'Versatile actor with 5+ years of experience in theater, TV, and film. Specializing in dramatic roles and character development.',
    genres: ['Drama', 'Action', 'Thriller', 'Comedy'],
    skills: ['Method Acting', 'Voice Acting', 'Stunt Work', 'Dance'],
    portfolio: [
      {
        id: 1,
        title: 'The Last Scene',
        type: 'video',
        thumbnail: '/images/portfolio1.svg',
        year: '2022'
      },
      {
        id: 2,
        title: 'Urban Legends',
        type: 'image',
        thumbnail: '/images/portfolio2.svg',
        year: '2021'
      }
    ],
    social: {
      linkedin: 'linkedin.com/in/johndoe',
      instagram: '@johndoe',
      twitter: '@johndoe',
      youtube: 'youtube.com/johndoe'
    }
  };

  // Star rating component
  const StarRating = ({ rating }) => {
    const stars = Array.from({ length: 5 }).map((_, i) => (
      <FaStar 
        key={i} 
        className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-400"} 
      />
    ));
    return (
      <div className="flex items-center">
        <div className="flex">{stars}</div>
        <span className="ml-2 text-sm font-medium">{rating}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white">
      {/* Profile Header */}
      <div className="relative">
        <div className="h-48 md:h-64 w-full overflow-hidden">
          <img 
            src={userData.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0F1C]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 -mt-20">
          <div className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <img
                src={userData.profileImage}
                alt="Profile"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#0A0F1C]"
              />
              <button className="absolute bottom-0 right-0 bg-fuchsia-500 p-2 rounded-full cursor-pointer hover:bg-fuchsia-600 transition-colors">
                <FaCamera className="text-white" />
              </button>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold">{userData.name}</h1>
                  <p className="text-xl text-gray-400">{userData.role}</p>
                  <div className="flex items-center justify-center md:justify-start mt-1">
                    <FaMapMarkerAlt className="text-gray-400 mr-1" />
                    <span className="text-gray-400">{userData.location}</span>
                  </div>
                  <p className="text-fuchsia-400 mt-2">{userData.tagline}</p>
                </div>
                
                <div className="flex space-x-3 mt-4 md:mt-0">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gradient-to-r from-fuchsia-500 to-blue-600 text-white rounded-lg font-medium hover:from-fuchsia-600 hover:to-blue-700 transition-colors"
                  >
                    <FaEdit className="inline-block mr-2" />
                    Edit Profile
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Statistics Section */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
            <div className="text-center">
              <p className="text-gray-400 text-sm">Roles Applied</p>
              <p className="text-2xl font-bold">{userData.stats.rolesApplied}</p>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
            <div className="text-center">
              <p className="text-gray-400 text-sm">Followers</p>
              <p className="text-2xl font-bold">{userData.stats.followers}</p>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
            <div className="text-center">
              <p className="text-gray-400 text-sm">Following</p>
              <p className="text-2xl font-bold">{userData.stats.following}</p>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
            <div className="text-center">
              <p className="text-gray-400 text-sm">Rating</p>
              <StarRating rating={userData.stats.rating} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Social Actions */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="flex flex-wrap justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-gradient-to-r from-fuchsia-500 to-blue-600 text-white rounded-lg font-medium hover:from-fuchsia-600 hover:to-blue-700 transition-colors"
          >
            <FaHeart className="inline-block mr-2" />
            Follow
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors"
          >
            <FaEnvelope className="inline-block mr-2" />
            Message
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors"
          >
            <FaShare className="inline-block mr-2" />
            Share
          </motion.button>
        </div>
      </div>
      
      {/* About Section */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-bold mb-4">About Me</h3>
          <p className="text-gray-300">{userData.about}</p>
        </div>
      </div>

      {/* Skills & Genres */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold mb-4">Genres</h3>
            <div className="flex flex-wrap gap-2">
              {userData.genres.map((genre, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-fuchsia-500/20 to-blue-500/20 text-fuchsia-300 rounded-full text-sm font-medium"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {userData.skills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-fuchsia-500/20 text-blue-300 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio */}
      <div className="max-w-7xl mx-auto px-4 mt-8 mb-8">
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-bold mb-4">Portfolio</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userData.portfolio.map(item => (
              <div 
                key={item.id}
                className="group relative rounded-xl overflow-hidden border border-white/10 hover:border-fuchsia-500/50 transition-colors"
              >
                <img 
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="text-white font-medium">{item.title}</h4>
                    <p className="text-gray-300 text-sm">{item.year}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard; 