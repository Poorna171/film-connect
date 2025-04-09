import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2 } from 'lucide-react';
import { motion } from 'framer-motion';

const EditProfileButton = ({ userRole }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    // Simulate a small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 500));
    navigate(`/${userRole}/edit-profile`);
    setIsLoading(false);
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={isLoading}
      className={`
        px-4 py-2 rounded-lg flex items-center space-x-2
        bg-gradient-to-r from-fuchsia-500 to-blue-600
        hover:from-fuchsia-600 hover:to-blue-700
        focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 focus:ring-offset-[#0A0F1C]
        transition-all duration-200 ease-in-out
        disabled:opacity-50 disabled:cursor-not-allowed
        group relative overflow-hidden
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative flex items-center space-x-2">
        {isLoading ? (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <Edit2 className="w-4 h-4" />
        )}
        <span>Edit Profile</span>
      </div>
    </motion.button>
  );
};

export default EditProfileButton; 