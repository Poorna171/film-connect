import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const filterOptions = [
  { id: 'all', label: 'All' },
  { id: 'new_role', label: 'New Roles' },
  { id: 'role_update', label: 'Role Updates' },
  { id: 'message', label: 'Messages' },
  { id: 'call_alert', label: 'Call Alerts' },
  { id: 'system', label: 'System' }
];

const FilterBar = ({ currentFilter, onFilterChange, onClose }) => {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-300">Filter Notifications</h3>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-white/5 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {filterOptions.map(option => (
          <motion.button
            key={option.id}
            onClick={() => onFilterChange(option.id)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              currentFilter === option.id
                ? 'bg-gradient-to-r from-fuchsia-900/50 to-blue-900/50 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {option.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar; 