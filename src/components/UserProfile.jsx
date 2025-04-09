import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, MessageSquare, Phone, Briefcase, 
  Users, Film, MapPin, Globe, Mail, 
  Instagram, Twitter, Linkedin, ChevronLeft,
  Heart, Share2, Bookmark, MoreHorizontal,
  Camera, Edit, Plus, X, MoreVertical,
  AlertTriangle, Edit2, PhoneCall, Link,
  Facebook, Upload
} from 'lucide-react';
import ReportModal from './ReportModal';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const UserProfile = ({ userId, onBack, isOwnProfile = false }) => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('portfolio');
  const [isFollowing, setIsFollowing] = useState(false);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  // Mock user data
  const user = {
    id: userId || 'current-user',
    name: currentUser?.displayName || 'John Doe',
    role: currentUser?.userType === 'director' ? 'Director' : 'Actor',
    location: 'Los Angeles, CA',
    avatar: currentUser?.photoURL || '/images/default-avatar.png',
    coverImage: '/images/default-cover.jpg',
    bio: 'Passionate about creating memorable performances and bringing stories to life.',
    stats: {
      followers: 1234,
      following: 567,
      roles: 12,
      reviews: 45,
      posts: 89
    },
    portfolio: [
      {
        id: 1,
        title: 'The Last Scene',
        type: 'video',
        thumbnail: '/images/portfolio1.jpg',
        year: '2022',
        role: 'Lead Actor',
        description: 'A dramatic performance in an award-winning short film.',
        link: '#'
      },
      {
        id: 2,
        title: 'Urban Legends',
        type: 'image',
        thumbnail: '/images/portfolio2.jpg',
        year: '2021',
        role: 'Supporting Role',
        description: 'Featured in a critically acclaimed indie film.',
        link: '#'
      }
    ],
    media: [
      {
        id: 1,
        type: 'image',
        url: '/images/media1.jpg',
        thumbnail: '/images/media1.jpg',
        caption: 'Behind the scenes of The Last Scene'
      },
      {
        id: 2,
        type: 'video',
        url: '/videos/media1.mp4',
        thumbnail: '/images/media2.jpg',
        caption: 'On set with the cast'
      }
    ],
    followers: [
      {
        id: 1,
        name: 'Emma Watson',
        role: 'Actor',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
      },
      {
        id: 2,
        name: 'Christopher Nolan',
        role: 'Director',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
      },
      {
        id: 3,
        name: 'Leonardo DiCaprio',
        role: 'Actor',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
      }
    ],
    following: [
      {
        id: 4,
        name: 'Martin Scorsese',
        role: 'Director',
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
      },
      {
        id: 5,
        name: 'Scarlett Johansson',
        role: 'Actor',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
      },
      {
        id: 6,
        name: 'Quentin Tarantino',
        role: 'Director',
        avatar: 'https://randomuser.me/api/portraits/men/4.jpg'
      }
    ],
    social: {
      instagram: '@johndoe',
      twitter: '@johndoe',
      linkedin: 'johndoe',
      website: 'www.johndoe.com'
    }
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle profile photo change
  const handleProfilePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      // In a real app, you would upload the file to a storage service
      // and update the user's profile with the new photo URL
      const reader = new FileReader();
      reader.onloadend = () => {
        // For now, we'll just update the local state
        user.avatar = reader.result;
        // In a real app, you would update the user's profile in your database
        console.log('Profile photo updated:', reader.result);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error updating profile photo:', error);
    } finally {
      setIsUploading(false);
    }
  };

  // Handle cover photo change
  const handleCoverPhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      // In a real app, you would upload the file to a storage service
      // and update the user's profile with the new cover photo URL
      const reader = new FileReader();
      reader.onloadend = () => {
        // For now, we'll just update the local state
        user.coverImage = reader.result;
        // In a real app, you would update the user's profile in your database
        console.log('Cover photo updated:', reader.result);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error updating cover photo:', error);
    } finally {
      setIsUploading(false);
    }
  };

  // Handle edit profile button click
  const handleEditProfile = () => {
    navigate(`/${currentUser?.userType}/edit-profile`);
  };

  // Handle follow/unfollow
  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  // Handle media click
  const handleMediaClick = (media) => {
    setSelectedMedia(media);
    setShowMediaModal(true);
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: user.name,
          text: `Check out ${user.name}'s profile on FilmConnect`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
        setShowShareModal(true);
      }
    } else {
      setShowShareModal(true);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    // Show a toast or notification here
    setShowShareModal(false);
  };

  // Tab content components
  const PortfolioTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0">
      {user.portfolio.map((item) => (
        <motion.div
          key={item.id}
          className="bg-[#0A0F1C]/80 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden hover:border-fuchsia-500/50 transition-all hover:bg-[#0A0F1C]/95 flex flex-col h-full"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative h-48">
            <img 
              src={item.thumbnail} 
              alt={item.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="text-sm text-gray-300">{item.year} • {item.role}</p>
            </div>
          </div>
          <div className="p-4 flex-grow bg-[#0A0F1C]/95">
            <p className="text-gray-300 text-sm mb-3">{item.description}</p>
            <a 
              href={item.link} 
              className="inline-flex items-center text-fuchsia-400 hover:text-fuchsia-300 text-sm font-medium group"
            >
              View Project
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const AboutTab = () => (
    <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
      <h3 className="text-xl font-bold mb-4">About</h3>
      <p className="text-gray-300 mb-6">{user.bio}</p>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <MapPin className="w-5 h-5 mr-3 text-gray-400" />
          <span className="text-gray-300">{user.location}</span>
        </div>
        
        {user.website && (
          <div className="flex items-center">
            <Globe className="w-5 h-5 mr-3 text-gray-400" />
            <a 
              href={`https://${user.website}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-fuchsia-400 hover:text-fuchsia-300"
            >
              {user.website}
            </a>
          </div>
        )}
        
        {user.email && (
          <div className="flex items-center">
            <Mail className="w-5 h-5 mr-3 text-gray-400" />
            <a 
              href={`mailto:${user.email}`} 
              className="text-gray-300 hover:text-fuchsia-400"
            >
              {user.email}
            </a>
          </div>
        )}
        
        {user.phone && (
          <div className="flex items-center">
            <Phone className="w-5 h-5 mr-3 text-gray-400" />
            <span className="text-gray-300">{user.phone}</span>
          </div>
        )}
      </div>
      
      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-3">Social</h4>
        <div className="flex space-x-4">
          {user.social.instagram && (
            <a 
              href={`https://instagram.com/${user.social.instagram.substring(1)}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
          )}
          {user.social.twitter && (
            <a 
              href={`https://twitter.com/${user.social.twitter.substring(1)}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
          )}
          {user.social.linkedin && (
            <a 
              href={`https://linkedin.com/in/${user.social.linkedin}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );

  const MediaTab = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {user.media && user.media.length > 0 ? (
        user.media.map((item) => (
          <motion.div
            key={item.id}
            onClick={() => handleMediaClick(item)}
            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.type === 'image' ? (
              <img 
                src={item.url} 
                alt={item.caption} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="relative w-full h-full">
                <img 
                  src={item.thumbnail} 
                  alt={item.caption} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
              <p className="p-3 text-sm text-white">{item.caption}</p>
            </div>
          </motion.div>
        ))
      ) : (
        <div className="col-span-full text-center py-12 text-gray-400">
          <p>No media available</p>
        </div>
      )}
    </div>
  );

  const FollowersTab = () => (
    <div className="space-y-4">
      {user.followers && user.followers.length > 0 ? (
        user.followers.map((follower) => (
          <motion.div
            key={follower.id}
            className="flex items-center p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10"
            whileHover={{ scale: 1.01 }}
          >
            <img
              src={follower.avatar}
              alt={follower.name}
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
            <div className="flex-1">
              <h3 className="font-medium">{follower.name}</h3>
              <p className="text-sm text-gray-400">{follower.role}</p>
            </div>
            <button className="px-4 py-2 bg-fuchsia-500 hover:bg-fuchsia-600 rounded-full text-sm">
              Follow
            </button>
          </motion.div>
        ))
      ) : (
        <div className="text-center py-12 text-gray-400">
          <p>No followers yet</p>
        </div>
      )}
    </div>
  );

  const FollowingTab = () => (
    <div className="space-y-4">
      {user.following && user.following.length > 0 ? (
        user.following.map((following) => (
          <motion.div
            key={following.id}
            className="flex items-center p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10"
            whileHover={{ scale: 1.01 }}
          >
            <img
              src={following.avatar}
              alt={following.name}
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
            <div className="flex-1">
              <h3 className="font-medium">{following.name}</h3>
              <p className="text-sm text-gray-400">{following.role}</p>
            </div>
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm">
              Following
            </button>
          </motion.div>
        ))
      ) : (
        <div className="text-center py-12 text-gray-400">
          <p>Not following anyone yet</p>
        </div>
      )}
    </div>
  );

  // Media Modal
  const MediaModal = () => (
    <AnimatePresence>
      {showMediaModal && selectedMedia && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setShowMediaModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-4xl w-full mx-4 bg-[#0A0F1C] rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowMediaModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            
            {selectedMedia.type === 'image' ? (
              <img 
                src={selectedMedia.url} 
                alt={selectedMedia.caption} 
                className="w-full max-h-[80vh] object-contain"
              />
            ) : (
              <div className="relative aspect-video">
                <img 
                  src={selectedMedia.thumbnail} 
                  alt={selectedMedia.caption} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
            
            <div className="p-4 border-t border-white/10">
              <p className="text-gray-300">{selectedMedia.caption}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white">
      {/* Cover Image */}
      <div className="relative h-64 md:h-80">
        <img
          src={user.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0F1C]" />
        
        {/* Back Button */}
        <button 
          className="absolute top-4 left-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
          onClick={() => window.history.back()}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          {isOwnProfile && (
            <label className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors cursor-pointer">
              <Upload className="w-5 h-5" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCoverPhotoChange}
                disabled={isUploading}
              />
            </label>
          )}
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </button>
          {!isOwnProfile && (
            <button
              onClick={() => setShowOptionsMenu(!showOptionsMenu)}
              className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-4 md:px-8 -mt-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between">
          <div className="flex items-end">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-[#0A0F1C]"
              />
              {isOwnProfile && (
                <label className="absolute bottom-0 right-0 p-1.5 rounded-full bg-fuchsia-500 hover:bg-fuchsia-600 transition-colors cursor-pointer">
                  <Camera className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfilePhotoChange}
                    disabled={isUploading}
                  />
                </label>
              )}
            </div>
            <div className="ml-4 mb-2">
              <h2 className="text-2xl md:text-3xl font-bold">{user.name}</h2>
              <div className="flex items-center text-gray-400">
                {user.role === 'Actor' ? (
                  <Film className="w-4 h-4 mr-1" />
                ) : (
                  <Briefcase className="w-4 h-4 mr-1" />
                )}
                <span>{user.role}</span>
                <span className="mx-2">•</span>
                <MapPin className="w-4 h-4 mr-1" />
                <span>{user.location}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
            {isOwnProfile ? (
              <motion.button
                onClick={handleEditProfile}
                className="px-4 py-2 bg-fuchsia-500 hover:bg-fuchsia-600 rounded-full flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Edit2 className="w-4 h-4 mr-1" />
                Edit Profile
              </motion.button>
            ) : (
              <>
                <button
                  onClick={handleFollowToggle}
                  className={`px-4 py-2 rounded-full flex items-center ${
                    isFollowing
                      ? 'bg-white/10 text-gray-300 hover:bg-red-500/20 hover:text-red-400'
                      : 'bg-fuchsia-500 text-white hover:bg-fuchsia-600'
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <User className="w-4 h-4 mr-1" />
                      Unfollow
                    </>
                  ) : (
                    <>
                      <User className="w-4 h-4 mr-1" />
                      Follow
                    </>
                  )}
                </button>
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full flex items-center">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Message
                </button>
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  Call
                </button>
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full flex items-center">
                  <Briefcase className="w-4 h-4 mr-1" />
                  {user.role === 'Actor' ? 'Hire' : 'Collaborate'}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex space-x-6 mt-6">
          <div className="text-center">
            <p className="text-2xl font-bold">{user.stats.posts.toLocaleString()}</p>
            <p className="text-sm text-gray-400">Posts</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{user.stats.followers.toLocaleString()}</p>
            <p className="text-sm text-gray-400">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{user.stats.following.toLocaleString()}</p>
            <p className="text-sm text-gray-400">Following</p>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-6">
          <p className="text-gray-300">{user.bio}</p>
        </div>

        {/* Tabs */}
        <div className="mt-8 border-b border-white/10">
          <div className="flex overflow-x-auto hide-scrollbar">
            {[
              { id: 'portfolio', label: 'Portfolio' },
              { id: 'about', label: 'About' },
              { id: 'media', label: 'Media' },
              { id: 'followers', label: 'Followers' },
              { id: 'following', label: 'Following' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap relative ${
                  activeTab === tab.id
                    ? 'text-fuchsia-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-fuchsia-500 to-blue-600"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-6 pb-8 min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === 'portfolio' && (
              <motion.div
                key="portfolio"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <PortfolioTab />
              </motion.div>
            )}
            {activeTab === 'about' && (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <AboutTab />
              </motion.div>
            )}
            {activeTab === 'media' && (
              <motion.div
                key="media"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <MediaTab />
              </motion.div>
            )}
            {activeTab === 'followers' && (
              <motion.div
                key="followers"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <FollowersTab />
              </motion.div>
            )}
            {activeTab === 'following' && (
              <motion.div
                key="following"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <FollowingTab />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Media Modal */}
      <MediaModal />

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0A0F1C] rounded-xl w-full max-w-md">
            <div className="border-b border-white/10 p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Share Profile</h2>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                <input
                  type="text"
                  value={window.location.href}
                  readOnly
                  className="flex-1 bg-transparent focus:outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2 bg-fuchsia-500 hover:bg-fuchsia-600 rounded-lg transition-colors"
                >
                  Copy
                </button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <button
                  onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`Check out ${user.name}'s profile on FilmConnect`)}`, '_blank')}
                  className="p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors flex flex-col items-center space-y-2"
                >
                  <Twitter className="w-6 h-6" />
                  <span className="text-sm">Twitter</span>
                </button>
                <button
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                  className="p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors flex flex-col items-center space-y-2"
                >
                  <Facebook className="w-6 h-6" />
                  <span className="text-sm">Facebook</span>
                </button>
                <button
                  onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(`${user.name} on FilmConnect`)}`, '_blank')}
                  className="p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors flex flex-col items-center space-y-2"
                >
                  <Linkedin className="w-6 h-6" />
                  <span className="text-sm">LinkedIn</span>
                </button>
                <button
                  onClick={() => window.open(`mailto:?subject=${encodeURIComponent(`${user.name} on FilmConnect`)}&body=${encodeURIComponent(`Check out ${user.name}'s profile on FilmConnect: ${window.location.href}`)}`, '_blank')}
                  className="p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors flex flex-col items-center space-y-2"
                >
                  <Mail className="w-6 h-6" />
                  <span className="text-sm">Email</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        targetId={userId}
      />

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#0A0F1C] p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <p className="text-gray-400 mb-4">This is a placeholder for the edit profile functionality. In a real app, this would open a form to edit the user's profile.</p>
            <button 
              onClick={() => setShowEditModal(false)}
              className="w-full px-4 py-2 bg-fuchsia-500 hover:bg-fuchsia-600 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile; 