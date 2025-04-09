import React, { useState } from 'react';
import { Search, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const Discover = ({ userRole }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users] = useState([
    {
      id: 1,
      name: 'John Doe',
      role: 'Actor',
      followers: 1234,
      following: true,
      profilePic: 'https://source.unsplash.com/random/100x100?face-1',
      bio: 'Award-winning actor with 10+ years of experience in theater and film.'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Director',
      followers: 3456,
      following: false,
      profilePic: 'https://source.unsplash.com/random/100x100?face-2',
      bio: 'Independent film director specializing in drama and documentary. Winner of multiple festival awards.'
    },
    {
      id: 3,
      name: 'Michael Chen',
      role: 'Actor',
      followers: 892,
      following: true,
      profilePic: 'https://source.unsplash.com/random/100x100?face-3',
      bio: 'Theater and voice actor with a passion for character-driven stories.'
    },
    {
      id: 4,
      name: 'Emily Rodriguez',
      role: 'Director',
      followers: 2789,
      following: false,
      profilePic: 'https://source.unsplash.com/random/100x100?face-4',
      bio: 'Commercial and music video director with a unique visual style.'
    },
    {
      id: 5,
      name: 'David Kim',
      role: 'Actor',
      followers: 567,
      following: false,
      profilePic: 'https://source.unsplash.com/random/100x100?face-5',
      bio: 'Method actor specializing in dramatic roles. Training in martial arts and stage combat.'
    },
    {
      id: 6,
      name: 'Lisa Thompson',
      role: 'Director',
      followers: 1567,
      following: true,
      profilePic: 'https://source.unsplash.com/random/100x100?face-6',
      bio: 'Horror and thriller film director known for atmospheric storytelling.'
    }
  ]);

  const filteredUsers = users.filter(user => {
    const searchLower = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.role.toLowerCase().includes(searchLower) ||
      user.bio.toLowerCase().includes(searchLower)
    );
  });

  const handleFollowToggle = (userId) => {
    // In a real app, this would make an API call to follow/unfollow
    console.log(`Toggle follow for user ${userId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Discover
          </h1>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Users className="w-5 h-5" />
            <span>{users.length} Users</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="Search by name, role, or bio..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* User Grid */}
        {filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No users found matching your search criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md
                          transition-shadow duration-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={user.profilePic}
                      alt={`${user.name}'s profile`}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {user.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {user.role}
                      </p>
                      <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                        <Users className="w-4 h-4 mr-1" />
                        {user.followers.toLocaleString()} followers
                      </div>
                    </div>
                    <button
                      onClick={() => handleFollowToggle(user.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium
                                ${user.following
                          ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                        } transition-colors duration-200`}
                    >
                      {user.following ? 'Following' : 'Follow'}
                    </button>
                  </div>
                  <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                    {user.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Discover; 