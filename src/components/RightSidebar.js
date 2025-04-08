import React from 'react';
import { FaNewspaper, FaUserPlus, FaFilm, FaAward } from 'react-icons/fa';

const RightSidebar = () => {
  return (
    <div className="space-y-4">
      {/* Industry News */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-bold text-lg mb-4 flex items-center">
          <FaNewspaper className="mr-2 text-blue-600" />
          Film Industry News
        </h3>
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h4 className="font-semibold text-blue-600">New Film Festival Announced</h4>
            <p className="text-sm text-gray-600 mt-1">
              International Film Festival coming to Los Angeles next summer
            </p>
            <p className="text-xs text-gray-500 mt-1">1,234 readers</p>
          </div>
          <div className="border-b pb-4">
            <h4 className="font-semibold text-blue-600">Award Season Predictions</h4>
            <p className="text-sm text-gray-600 mt-1">
              Early favorites for this year's major film awards
            </p>
            <p className="text-xs text-gray-500 mt-1">5,678 readers</p>
          </div>
          <div>
            <h4 className="font-semibold text-blue-600">Industry Trends 2024</h4>
            <p className="text-sm text-gray-600 mt-1">
              Emerging technologies shaping the future of filmmaking
            </p>
            <p className="text-xs text-gray-500 mt-1">9,012 readers</p>
          </div>
        </div>
      </div>

      {/* Suggested Connections */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-bold text-lg mb-4 flex items-center">
          <FaUserPlus className="mr-2 text-blue-600" />
          People you may know
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img
                src="https://via.placeholder.com/40"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h4 className="font-semibold">Mike Actor</h4>
                <p className="text-sm text-gray-600">Actor at Warner Bros</p>
              </div>
            </div>
            <button className="text-blue-600 font-semibold hover:bg-blue-50 px-3 py-1 rounded">
              Connect
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img
                src="https://via.placeholder.com/40"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h4 className="font-semibold">Lisa Producer</h4>
                <p className="text-sm text-gray-600">Producer at Netflix</p>
              </div>
            </div>
            <button className="text-blue-600 font-semibold hover:bg-blue-50 px-3 py-1 rounded">
              Connect
            </button>
          </div>
        </div>
      </div>

      {/* Trending Topics */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-bold text-lg mb-4 flex items-center">
          <FaFilm className="mr-2 text-blue-600" />
          Trending in Film
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-800">#NewMovieRelease</span>
            <span className="text-sm text-gray-500">2.5k posts</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-800">#FilmIndustry</span>
            <span className="text-sm text-gray-500">1.8k posts</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-800">#CastingCall</span>
            <span className="text-sm text-gray-500">1.2k posts</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar; 