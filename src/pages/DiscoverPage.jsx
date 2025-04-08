import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, UserPlus, UserMinus, 
  Users, Film, Briefcase, 
  ChevronLeft, Instagram, Twitter, 
  Globe, Mail, Phone, MapPin
} from 'lucide-react';

const DiscoverPage = ({ userRole }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'actors', 'directors'
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for users
  useEffect(() => {
    // Simulate API call
    const mockUsers = [
      {
        id: 1,
        name: "Sarah Chen",
        role: "Director",
        bio: "Award-winning director with 10+ years of experience in independent films. Specializing in psychological thrillers and character-driven dramas.",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        coverImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        followers: 1243,
        following: 567,
        location: "Los Angeles, CA",
        website: "www.sarahchen.com",
        email: "sarah@example.com",
        phone: "+1 (555) 123-4567",
        social: {
          instagram: "@sarahchen",
          twitter: "@sarahchen"
        },
        media: [
          {
            id: 1,
            type: "image",
            url: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            caption: "On set of 'Midnight Echo'"
          },
          {
            id: 2,
            type: "video",
            url: "https://example.com/video.mp4",
            thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            caption: "Behind the scenes"
          }
        ],
        isFollowing: false
      },
      {
        id: 2,
        name: "Michael Rodriguez",
        role: "Actor",
        bio: "Versatile actor with experience in theater, film, and television. Known for dramatic roles and character transformations.",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        coverImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        followers: 876,
        following: 432,
        location: "New York, NY",
        website: "www.michaelrodriguez.com",
        email: "michael@example.com",
        phone: "+1 (555) 987-6543",
        social: {
          instagram: "@michaelrodriguez",
          twitter: "@michaelrodriguez"
        },
        media: [
          {
            id: 1,
            type: "image",
            url: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            caption: "On set of 'Urban Tales'"
          }
        ],
        isFollowing: true
      },
      {
        id: 3,
        name: "Emma Thompson",
        role: "Casting Director",
        bio: "Experienced casting director with a keen eye for talent. Worked on numerous award-winning films and television series.",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        coverImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        followers: 654,
        following: 321,
        location: "London, UK",
        website: "www.emmathompson.com",
        email: "emma@example.com",
        phone: "+44 20 1234 5678",
        social: {
          instagram: "@emmathompson",
          twitter: "@emmathompson"
        },
        media: [],
        isFollowing: false
      },
      {
        id: 4,
        name: "James Wilson",
        role: "Director",
        bio: "Independent filmmaker focused on social justice themes. Winner of multiple film festival awards.",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg",
        coverImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        followers: 543,
        following: 234,
        location: "Chicago, IL",
        website: "www.jameswilson.com",
        email: "james@example.com",
        phone: "+1 (555) 234-5678",
        social: {
          instagram: "@jameswilson",
          twitter: "@jameswilson"
        },
        media: [],
        isFollowing: false
      },
      {
        id: 5,
        name: "Olivia Martinez",
        role: "Actor",
        bio: "Up-and-coming actress with a background in theater. Passionate about diverse storytelling and representation.",
        avatar: "https://randomuser.me/api/portraits/women/22.jpg",
        coverImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        followers: 432,
        following: 345,
        location: "Toronto, Canada",
        website: "www.oliviamartinez.com",
        email: "olivia@example.com",
        phone: "+1 (416) 123-4567",
        social: {
          instagram: "@oliviamartinez",
          twitter: "@oliviamartinez"
        },
        media: [],
        isFollowing: true
      }
    ];

    // Simulate loading delay
    setTimeout(() => {
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter users based on search query and role filter
  useEffect(() => {
    let filtered = users;
    
    // Apply role filter
    if (filter !== 'all') {
      filtered = filtered.filter(user => 
        filter === 'actors' ? user.role === 'Actor' : user.role === 'Director'
      );
    }
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.bio.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredUsers(filtered);
  }, [searchQuery, filter, users]);

  const handleFollowToggle = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user
    ));
  };

  const handleBackToList = () => {
    setSelectedUser(null);
  };

  // User Card Component
  const UserCard = ({ user }) => (
    <motion.div
      layoutId={`user-${user.id}`}
      onClick={() => setSelectedUser(user)}
      className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden cursor-pointer hover:border-fuchsia-500/50 transition-colors"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="h-24 bg-gradient-to-r from-fuchsia-500/20 to-blue-500/20"></div>
      <div className="px-4 pb-4">
        <div className="flex justify-between items-start -mt-10">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 rounded-full border-4 border-[#0A0F1C]"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleFollowToggle(user.id);
            }}
            className={`mt-2 px-3 py-1 rounded-full text-sm flex items-center ${
              user.isFollowing
                ? 'bg-white/10 text-gray-300 hover:bg-red-500/20 hover:text-red-400'
                : 'bg-fuchsia-500 text-white hover:bg-fuchsia-600'
            }`}
          >
            {user.isFollowing ? (
              <>
                <UserMinus className="w-4 h-4 mr-1" />
                Unfollow
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 mr-1" />
                Follow
              </>
            )}
          </button>
        </div>
        <h3 className="text-xl font-bold mt-2">{user.name}</h3>
        <div className="flex items-center text-gray-400 text-sm mb-2">
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
        <p className="text-gray-300 text-sm line-clamp-2 mb-3">{user.bio}</p>
        <div className="flex items-center text-sm text-gray-400">
          <Users className="w-4 h-4 mr-1" />
          <span>{user.followers.toLocaleString()} followers</span>
        </div>
      </div>
    </motion.div>
  );

  // User Profile Component
  const UserProfile = ({ user }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full overflow-y-auto"
    >
      {/* Cover Image */}
      <div className="relative h-48 md:h-64 w-full overflow-hidden">
        <img 
          src={user.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0F1C]"></div>
        <button
          onClick={handleBackToList}
          className="absolute top-4 left-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Profile Info */}
      <div className="px-4 md:px-8 -mt-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between">
          <div className="flex items-end">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-[#0A0F1C]"
            />
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
          <button
            onClick={() => handleFollowToggle(user.id)}
            className={`mt-4 md:mt-0 px-4 py-2 rounded-full flex items-center ${
              user.isFollowing
                ? 'bg-white/10 text-gray-300 hover:bg-red-500/20 hover:text-red-400'
                : 'bg-fuchsia-500 text-white hover:bg-fuchsia-600'
            }`}
          >
            {user.isFollowing ? (
              <>
                <UserMinus className="w-4 h-4 mr-1" />
                Unfollow
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 mr-1" />
                Follow
              </>
            )}
          </button>
        </div>

        {/* Stats */}
        <div className="flex space-x-6 mt-6">
          <div className="text-center">
            <p className="text-2xl font-bold">{user.followers.toLocaleString()}</p>
            <p className="text-sm text-gray-400">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{user.following.toLocaleString()}</p>
            <p className="text-sm text-gray-400">Following</p>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">About</h3>
          <p className="text-gray-300">{user.bio}</p>
        </div>

        {/* Contact Info */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <div className="space-y-2">
            {user.website && (
              <div className="flex items-center text-gray-300">
                <Globe className="w-4 h-4 mr-2 text-gray-400" />
                <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-fuchsia-400">
                  {user.website}
                </a>
              </div>
            )}
            {user.email && (
              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-2 text-gray-400" />
                <a href={`mailto:${user.email}`} className="hover:text-fuchsia-400">
                  {user.email}
                </a>
              </div>
            )}
            {user.phone && (
              <div className="flex items-center text-gray-300">
                <Phone className="w-4 h-4 mr-2 text-gray-400" />
                <span>{user.phone}</span>
              </div>
            )}
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Social</h3>
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
          </div>
        </div>

        {/* Media */}
        {user.media.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Media</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.media.map((item) => (
                <div key={item.id} className="rounded-lg overflow-hidden border border-white/10">
                  {item.type === 'image' ? (
                    <img 
                      src={item.url} 
                      alt={item.caption} 
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="relative h-48">
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
                  <div className="p-3">
                    <p className="text-sm text-gray-300">{item.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="h-full">
      <AnimatePresence mode="wait">
        {selectedUser ? (
          <UserProfile key="profile" user={selectedUser} />
        ) : (
          <motion.div
            key="discover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full"
          >
            {/* Search and Filter */}
            <div className="mb-6">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, role, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 rounded-lg border border-white/10 focus:outline-none focus:border-fuchsia-500"
                />
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    filter === 'all'
                      ? 'bg-fuchsia-500 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('actors')}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    filter === 'actors'
                      ? 'bg-fuchsia-500 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  Actors
                </button>
                <button
                  onClick={() => setFilter('directors')}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    filter === 'directors'
                      ? 'bg-fuchsia-500 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  Directors
                </button>
              </div>
            </div>

            {/* User Grid */}
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fuchsia-500"></div>
              </div>
            ) : filteredUsers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map(user => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">No users found matching your search criteria.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DiscoverPage; 