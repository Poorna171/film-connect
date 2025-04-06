import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ActorDashboard = () => {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  // Mock data for dashboard
  const stats = [
    { label: 'Profile Views', value: '1,234', change: '+12%', trend: 'up' },
    { label: 'Casting Calls', value: '23', change: '+5', trend: 'up' },
    { label: 'Applications', value: '18', change: '+3', trend: 'up' },
    { label: 'Messages', value: '7', change: 'New', trend: 'neutral' }
  ];

  const recentCastingCalls = [
    {
      id: 1,
      title: 'Lead Role in Drama Series',
      director: 'Christopher Nolan',
      location: 'Los Angeles, CA',
      posted: '2 days ago',
      status: 'Open',
      deadline: 'May 15, 2023'
    },
    {
      id: 2,
      title: 'Supporting Role in Action Film',
      director: 'Martin Scorsese',
      location: 'New York, NY',
      posted: '3 days ago',
      status: 'Open',
      deadline: 'May 20, 2023'
    },
    {
      id: 3,
      title: 'Guest Star in TV Comedy',
      director: 'Quentin Tarantino',
      location: 'Vancouver, BC',
      posted: '5 days ago',
      status: 'Open',
      deadline: 'May 25, 2023'
    }
  ];

  const upcomingAuditions = [
    {
      id: 1,
      title: 'Lead Role in Drama Series',
      date: 'May 10, 2023',
      time: '10:00 AM',
      location: 'Los Angeles, CA',
      type: 'In-Person'
    },
    {
      id: 2,
      title: 'Supporting Role in Action Film',
      date: 'May 12, 2023',
      time: '2:00 PM',
      location: 'New York, NY',
      type: 'Virtual'
    }
  ];

  const recentMessages = [
    {
      id: 1,
      sender: 'Christopher Nolan',
      subject: 'Audition Confirmation',
      preview: 'Thank you for your application. We would like to...',
      date: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      sender: 'Martin Scorsese',
      subject: 'Call Back Information',
      preview: 'We were impressed with your audition and would like to...',
      date: '1 day ago',
      unread: false
    },
    {
      id: 3,
      sender: 'Quentin Tarantino',
      subject: 'Project Details',
      preview: 'Here are the details for the upcoming project...',
      date: '2 days ago',
      unread: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white">
      {/* Navigation Bar */}
      <nav className="bg-[#131824] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
                  FilmConnect
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`${
                    activeTab === 'overview'
                      ? 'border-cyan-500 text-white'
                      : 'border-transparent text-gray-300 hover:text-white'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('casting')}
                  className={`${
                    activeTab === 'casting'
                      ? 'border-cyan-500 text-white'
                      : 'border-transparent text-gray-300 hover:text-white'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Casting Calls
                </button>
                <button
                  onClick={() => setActiveTab('auditions')}
                  className={`${
                    activeTab === 'auditions'
                      ? 'border-cyan-500 text-white'
                      : 'border-transparent text-gray-300 hover:text-white'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Auditions
                </button>
                <button
                  onClick={() => setActiveTab('messages')}
                  className={`${
                    activeTab === 'messages'
                      ? 'border-cyan-500 text-white'
                      : 'border-transparent text-gray-300 hover:text-white'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Messages
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`${
                    activeTab === 'profile'
                      ? 'border-cyan-500 text-white'
                      : 'border-transparent text-gray-300 hover:text-white'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  Profile
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <button
                  onClick={handleLogout}
                  className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="px-4 py-5 sm:px-6">
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {currentUser?.displayName || 'Actor'}
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Here's what's happening with your acting career today.
          </p>
        </div>

        {/* Stats Section */}
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-[#131824] overflow-hidden shadow rounded-lg border border-white/10"
            >
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-400 truncate">{stat.label}</dt>
                <dd className="mt-1 text-3xl font-semibold text-white">{stat.value}</dd>
                <dd className={`mt-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-400' : 
                  stat.trend === 'down' ? 'text-red-400' : 
                  'text-blue-400'
                }`}>
                  {stat.change}
                </dd>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Casting Calls */}
        <div className="mt-8">
          <div className="px-4 sm:px-6">
            <h2 className="text-lg font-medium text-white">Recent Casting Calls</h2>
          </div>
          <div className="mt-2 bg-[#131824] shadow overflow-hidden sm:rounded-md border border-white/10">
            <ul className="divide-y divide-white/10">
              {recentCastingCalls.map((call) => (
                <li key={call.id}>
                  <Link to={`/casting/${call.id}`} className="block hover:bg-white/5">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-cyan-400 truncate">{call.title}</p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {call.status}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-400">
                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {call.director}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-400 sm:mt-0 sm:ml-6">
                            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {call.location}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-400 sm:mt-0">
                          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p>
                            Deadline: <time dateTime={call.deadline}>{call.deadline}</time>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 text-right">
            <Link
              to="/casting"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-cyan-400 bg-transparent hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              View all casting calls
            </Link>
          </div>
        </div>

        {/* Upcoming Auditions */}
        <div className="mt-8">
          <div className="px-4 sm:px-6">
            <h2 className="text-lg font-medium text-white">Upcoming Auditions</h2>
          </div>
          <div className="mt-2 bg-[#131824] shadow overflow-hidden sm:rounded-md border border-white/10">
            <ul className="divide-y divide-white/10">
              {upcomingAuditions.map((audition) => (
                <li key={audition.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-cyan-400 truncate">{audition.title}</p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          audition.type === 'In-Person' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {audition.type}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-400">
                          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {audition.date}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-400 sm:mt-0 sm:ml-6">
                          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {audition.time}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-400 sm:mt-0">
                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {audition.location}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 text-right">
            <Link
              to="/auditions"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-cyan-400 bg-transparent hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              View all auditions
            </Link>
          </div>
        </div>

        {/* Recent Messages */}
        <div className="mt-8">
          <div className="px-4 sm:px-6">
            <h2 className="text-lg font-medium text-white">Recent Messages</h2>
          </div>
          <div className="mt-2 bg-[#131824] shadow overflow-hidden sm:rounded-md border border-white/10">
            <ul className="divide-y divide-white/10">
              {recentMessages.map((message) => (
                <li key={message.id}>
                  <Link to={`/messages/${message.id}`} className="block hover:bg-white/5">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-cyan-400 truncate">{message.sender}</p>
                        <div className="ml-2 flex-shrink-0 flex">
                          {message.unread && (
                            <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              New
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="text-sm text-white font-medium">{message.subject}</p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-400 sm:mt-0">
                          <p>{message.date}</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-400 truncate">{message.preview}</p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 text-right">
            <Link
              to="/messages"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-cyan-400 bg-transparent hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              View all messages
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ActorDashboard;
