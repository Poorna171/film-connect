import React from 'react';
import { FaBriefcase, FaFilm, FaUser, FaStar, FaAward } from 'react-icons/fa';

const LeftSidebar = () => {
  return (
    <div className="space-y-4">
      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="border-b pb-4">
          <div className="h-24 bg-blue-600 rounded-t-lg -mt-4 -mx-4"></div>
          <div className="text-center -mt-12">
            <img
              src="https://via.placeholder.com/80"
              alt="Profile"
              className="w-20 h-20 rounded-full border-4 border-white mx-auto"
            />
            <h2 className="text-xl font-bold mt-2">John Doe</h2>
            <p className="text-gray-600">Actor | Drama, Action</p>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Profile views</span>
            <span>123</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>Post impressions</span>
            <span>456</span>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-bold text-lg mb-2">Quick Links</h3>
        <ul className="space-y-2">
          <li className="flex items-center text-gray-600 hover:text-blue-600 cursor-pointer">
            <FaBriefcase className="mr-2" />
            <span>My Portfolio</span>
          </li>
          <li className="flex items-center text-gray-600 hover:text-blue-600 cursor-pointer">
            <FaFilm className="mr-2" />
            <span>My Projects</span>
          </li>
          <li className="flex items-center text-gray-600 hover:text-blue-600 cursor-pointer">
            <FaUser className="mr-2" />
            <span>My Network</span>
          </li>
          <li className="flex items-center text-gray-600 hover:text-blue-600 cursor-pointer">
            <FaStar className="mr-2" />
            <span>Saved Roles</span>
          </li>
          <li className="flex items-center text-gray-600 hover:text-blue-600 cursor-pointer">
            <FaAward className="mr-2" />
            <span>Awards & Recognition</span>
          </li>
        </ul>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-bold text-lg mb-2">Recent Activity</h3>
        <div className="space-y-3">
          <div className="text-sm">
            <p className="text-gray-800">Applied for "Lead Role" in Drama Series</p>
            <p className="text-gray-500 text-xs">2 days ago</p>
          </div>
          <div className="text-sm">
            <p className="text-gray-800">Connected with Sarah Director</p>
            <p className="text-gray-500 text-xs">3 days ago</p>
          </div>
          <div className="text-sm">
            <p className="text-gray-800">Updated portfolio with new headshots</p>
            <p className="text-gray-500 text-xs">1 week ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar; 