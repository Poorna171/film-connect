import React from 'react';
import { FaFilm, FaBriefcase, FaUser, FaHeart, FaComment, FaShare } from 'react-icons/fa';

const Feed = () => {
  return (
    <div className="space-y-4">
      {/* Create Post */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center space-x-4">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <input
            type="text"
            placeholder="Share your thoughts or post a casting call..."
            className="flex-1 px-4 py-2 rounded-full bg-gray-100 focus:outline-none"
          />
        </div>
        <div className="flex justify-between mt-4 pt-4 border-t">
          <button className="flex items-center text-gray-600 hover:bg-gray-100 px-4 py-2 rounded">
            <FaFilm className="mr-2" />
            <span>Photo/Video</span>
          </button>
          <button className="flex items-center text-gray-600 hover:bg-gray-100 px-4 py-2 rounded">
            <FaBriefcase className="mr-2" />
            <span>Casting Call</span>
          </button>
          <button className="flex items-center text-gray-600 hover:bg-gray-100 px-4 py-2 rounded">
            <FaUser className="mr-2" />
            <span>Tag someone</span>
          </button>
        </div>
      </div>

      {/* Feed Posts */}
      <div className="space-y-4">
        {/* Casting Call Post */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-bold">Sarah Director</h3>
              <p className="text-sm text-gray-600">Director | Drama Series</p>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold text-lg">Casting Call: Lead Actor</h4>
            <p className="mt-2">
              Looking for a male lead actor (25-35) for an upcoming drama series. 
              Must have experience in emotional scenes and be available for 3 months 
              starting next month. Auditions will be held next week.
            </p>
            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
              <h5 className="font-semibold">Requirements:</h5>
              <ul className="list-disc ml-4 mt-2 text-sm text-gray-600">
                <li>5+ years of acting experience</li>
                <li>Strong emotional range</li>
                <li>Available for 3 months</li>
                <li>Based in Los Angeles or willing to relocate</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 flex justify-between text-gray-600">
            <button className="flex items-center space-x-2 hover:text-blue-600">
              <FaHeart />
              <span>Like</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-blue-600">
              <FaComment />
              <span>Comment</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-blue-600">
              <FaShare />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Regular Post */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-bold">Mike Actor</h3>
              <p className="text-sm text-gray-600">Actor | Action, Drama</p>
            </div>
          </div>
          <p className="mt-4">
            Just wrapped up filming for my latest project! Excited to share this journey 
            with you all. Stay tuned for the trailer coming soon! 🎬✨
          </p>
          <img
            src="https://via.placeholder.com/600x400"
            alt="Post content"
            className="mt-4 rounded-lg w-full"
          />
          <div className="mt-4 flex justify-between text-gray-600">
            <button className="flex items-center space-x-2 hover:text-blue-600">
              <FaHeart />
              <span>Like</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-blue-600">
              <FaComment />
              <span>Comment</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-blue-600">
              <FaShare />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed; 