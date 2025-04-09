import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Home, Film, Bell, User, MessageSquare, 
  Plus, Upload, Video, Star, Quote,
  ChevronLeft, ChevronRight, Play, Pause,
  Volume2, VolumeX, Heart, X, Bookmark,
  Share2, MessageCircle, Flame, Clock,
  Sparkles, Zap, Briefcase, Users
} from 'lucide-react';
import { 
  FaPlay, FaPause, FaVolumeMute, FaVolumeUp, FaHeart, 
  FaTimes, FaChevronLeft, FaChevronRight, FaBookmark,
  FaShare, FaComment, FaFire, FaTheaterMasks, FaClock
} from 'react-icons/fa';

const HomeDashboard = ({ userRole = 'actor' }) => {
  const navigate = useNavigate();
  const [currentTrendingIndex, setCurrentTrendingIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('home');
  const [showQuickActions, setShowQuickActions] = useState(false);

  // Daily Film Quote
  const filmQuote = {
    text: "Did you know? Robert De Niro gained 60 pounds for 'Raging Bull'.",
    icon: '🎬'
  };

  // Navigation Tabs
  const navTabs = [
    { id: 'home', icon: Home, label: 'Home', path: `/${userRole}` },
    ...(userRole === 'director' 
      ? [
          { id: 'applications', icon: Film, label: 'Applications', path: `/${userRole}/applications` },
          { id: 'discover', icon: Users, label: 'Discover', path: `/${userRole}/discover` }
        ] 
      : [
          { id: 'roles', icon: Briefcase, label: 'Roles', path: `/${userRole}/roles` },
          { id: 'discover', icon: Users, label: 'Discover', path: `/${userRole}/discover` }
        ]
    ),
    { id: 'notifications', icon: Bell, label: 'Alerts', path: `/${userRole}/notifications` },
    { id: 'messages', icon: MessageSquare, label: 'Messages', path: `/${userRole}/messages` },
    { id: 'profile', icon: User, label: 'Profile', path: `/${userRole}/profile` }
  ];

  // Quick Actions
  const quickActions = [
    ...(userRole === 'director' 
      ? [{ id: 'post-role', icon: Plus, label: 'Post a Role', color: 'from-fuchsia-500 to-purple-600', path: '/director/applications' }]
      : []
    ),
    { id: 'upload-reel', icon: Upload, label: 'Upload Reel', color: 'from-cyan-500 to-blue-600', path: `/${userRole}/profile` },
    { id: 'live-audition', icon: Video, label: 'Go Live', color: 'from-amber-500 to-orange-600', path: `/${userRole}/live` }
  ];

  // Sample data
  const trendingRoles = [
    {
      id: 1,
      title: "Lead Role in 'Midnight Echo'",
      director: "Sarah Chen",
      genre: "Psychological Thriller",
      deadline: "3 days",
      image: "/images/post1.svg"
    },
    {
      id: 2,
      title: "Supporting Actor in 'Urban Tales'",
      director: "Michael Rodriguez",
      genre: "Drama",
      deadline: "5 days",
      image: "/images/post2.svg"
    }
  ];

  const featuredCasting = {
    title: "Star in 'The Last Light'",
    director: "James Wilson",
    budget: "$50,000",
    location: "Los Angeles, CA",
    deadline: "2023-12-31",
    description: "Seeking a strong dramatic actor for the lead role in an emotional story about family and redemption.",
    image: "/images/default-cover.svg"
  };

  const socialFeed = [
    {
      id: 1,
      user: {
        name: "Emma Thompson",
        role: "Actor",
        avatar: "/images/default-profile.svg"
      },
      content: "Just wrapped up my latest short film! Can't wait to share it with you all 🎬",
      likes: 234,
      comments: 45,
      image: "/images/portfolio1.svg"
    }
  ];

  const progressStats = {
    applications: 12,
    connections: 45,
    views: 156,
    matches: 8
  };

  const suggestedRoles = [
    {
      id: 1,
      title: "Lead Role - Drama Series",
      type: "Television",
      pay: "$2,500/episode",
      location: "New York",
      image: "/images/portfolio2.svg"
    }
  ];

  const auditions = [
    {
      id: 1,
      actor: "David Chen",
      role: "Detective",
      duration: "00:45",
      thumbnail: "/images/portfolio1.svg"
    }
  ];

  // Animation variants for hover effects
  const glowVariants = {
    hover: {
      boxShadow: '0 0 20px rgba(192, 132, 252, 0.4)',
      transition: { duration: 0.2 }
    }
  };

  const pulseVariants = {
    initial: { scale: 1 },
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const tab = navTabs.find(t => t.id === tabId);
    if (tab) {
      navigate(tab.path);
    }
  };

  const handleQuickActionClick = (actionId) => {
    const action = quickActions.find(a => a.id === actionId);
    if (action && action.path) {
      navigate(action.path);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white pb-24 md:pb-0">
      {/* Animated Background Stars */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ opacity: 0.5, x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      {/* Daily Film Quote Banner - Enhanced */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-r from-purple-900/50 to-fuchsia-900/50 border-b border-white/10 overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px'
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center text-sm">
          <motion.span 
            className="mr-2"
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {filmQuote.icon}
          </motion.span>
          <p className="text-gray-300">{filmQuote.text}</p>
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-fuchsia-500 to-blue-600 bg-clip-text text-transparent">
              Quick Actions
            </h2>
            <button
              onClick={() => setShowQuickActions(!showQuickActions)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          
          <AnimatePresence>
            {showQuickActions && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {quickActions.map((action) => (
                  <motion.button
                    key={action.id}
                    onClick={() => handleQuickActionClick(action.id)}
                    className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-fuchsia-500/10 to-blue-600/10 border border-white/10 hover:border-white/20 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color}`}>
                      <action.icon className="w-5 h-5" />
                    </div>
                    <span>{action.label}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Trending Roles Carousel */}
        <div className="relative overflow-hidden bg-gradient-to-b from-black to-[#0A0F1C] p-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center mb-4">
              <FaFire className="text-yellow-500 mr-2" />
              <h2 className="text-xl font-bold">Trending Roles</h2>
            </div>
            
            <div className="relative">
              <div className="flex overflow-hidden rounded-xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTrendingIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="w-full"
                  >
                    <div className="relative h-64 md:h-80">
                      <img 
                        src={trendingRoles[currentTrendingIndex].image}
                        alt={trendingRoles[currentTrendingIndex].title}
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-xl">
                        <div className="absolute bottom-0 p-4">
                          <h3 className="text-xl font-bold">{trendingRoles[currentTrendingIndex].title}</h3>
                          <p className="text-gray-300">Directed by {trendingRoles[currentTrendingIndex].director}</p>
                          <div className="flex items-center mt-2">
                            <span className="bg-fuchsia-500/20 text-fuchsia-300 px-2 py-1 rounded-full text-sm">
                              {trendingRoles[currentTrendingIndex].genre}
                            </span>
                            <span className="ml-2 text-sm text-gray-300">
                              <FaClock className="inline mr-1" />
                              {trendingRoles[currentTrendingIndex].deadline} left
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <button 
                onClick={() => setCurrentTrendingIndex(i => (i > 0 ? i - 1 : trendingRoles.length - 1))}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <FaChevronLeft />
              </button>
              <button 
                onClick={() => setCurrentTrendingIndex(i => (i < trendingRoles.length - 1 ? i + 1 : 0))}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto px-4 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Featured Casting Call */}
              <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
                <div className="relative h-48">
                  <img 
                    src={featuredCasting.image}
                    alt={featuredCasting.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent">
                    <div className="absolute bottom-0 p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full text-sm font-medium">
                          Featured
                        </span>
                        <span className="text-sm text-gray-300">
                          <FaClock className="inline mr-1" />
                          Deadline: {featuredCasting.deadline}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold">{featuredCasting.title}</h3>
                      <p className="text-gray-300">{featuredCasting.director} • {featuredCasting.location}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-300 mb-4">{featuredCasting.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-fuchsia-400 font-medium">{featuredCasting.budget}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-gradient-to-r from-fuchsia-500 to-blue-600 rounded-lg font-medium"
                    >
                      Apply Now
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Daily Progress */}
              <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
                <h3 className="text-xl font-bold mb-4">Your Progress</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-gray-400 text-sm">Applications</p>
                    <p className="text-2xl font-bold">{progressStats.applications}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-gray-400 text-sm">New Connections</p>
                    <p className="text-2xl font-bold">{progressStats.connections}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-gray-400 text-sm">Profile Views</p>
                    <p className="text-2xl font-bold">{progressStats.views}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-gray-400 text-sm">Role Matches</p>
                    <p className="text-2xl font-bold">{progressStats.matches}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Role Match Slider */}
              <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Role Matches</h3>
                  <FaTheaterMasks className="text-fuchsia-400" />
                </div>
                
                <div className="relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentRoleIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="relative"
                    >
                      <img 
                        src={suggestedRoles[currentRoleIndex].image}
                        alt={suggestedRoles[currentRoleIndex].title}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg">
                        <div className="absolute bottom-0 p-4">
                          <h4 className="text-lg font-bold">{suggestedRoles[currentRoleIndex].title}</h4>
                          <p className="text-gray-300">{suggestedRoles[currentRoleIndex].type}</p>
                          <div className="flex items-center mt-2">
                            <span className="text-green-400">{suggestedRoles[currentRoleIndex].pay}</span>
                            <span className="mx-2">•</span>
                            <span className="text-gray-300">{suggestedRoles[currentRoleIndex].location}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                  
                  <div className="flex justify-center mt-4 space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-4 bg-red-500/20 rounded-full text-red-400"
                    >
                      <FaTimes size={20} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-4 bg-green-500/20 rounded-full text-green-400"
                    >
                      <FaHeart size={20} />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Social Feed */}
              <div className="space-y-4">
                {socialFeed.map(post => (
                  <div 
                    key={post.id}
                    className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4"
                  >
                    <div className="flex items-center mb-4">
                      <img 
                        src={post.user.avatar}
                        alt={post.user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="ml-3">
                        <p className="font-medium">{post.user.name}</p>
                        <p className="text-sm text-gray-400">{post.user.role}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{post.content}</p>
                    
                    {post.image && (
                      <img 
                        src={post.image}
                        alt="Post content"
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    
                    <div className="flex items-center justify-between text-gray-400">
                      <button className="flex items-center space-x-1 hover:text-fuchsia-400">
                        <FaHeart />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-fuchsia-400">
                        <FaComment />
                        <span>{post.comments}</span>
                      </button>
                      <button className="hover:text-fuchsia-400">
                        <FaShare />
                      </button>
                      <button className="hover:text-fuchsia-400">
                        <FaBookmark />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Audition Viewer */}
              <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
                <div className="relative">
                  <img 
                    src={auditions[0].thumbnail}
                    alt={`${auditions[0].actor}'s audition`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-4 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                    >
                      {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
                    </button>
                  </div>
                  <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className="absolute bottom-4 right-4 p-2 bg-black/50 rounded-full"
                  >
                    {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                  </button>
                  <div className="absolute bottom-4 left-4 bg-black/50 px-2 py-1 rounded text-sm">
                    {auditions[0].duration}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{auditions[0].actor}</p>
                      <p className="text-sm text-gray-400">Role: {auditions[0].role}</p>
                    </div>
                    <button className="text-fuchsia-400 hover:text-fuchsia-300">
                      <FaBookmark />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeDashboard; 