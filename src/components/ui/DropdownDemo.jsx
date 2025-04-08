import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ThemedDropdown from './ThemedDropdown';

const DropdownDemo = () => {
  // Filter options for applications
  const applicationStatusOptions = [
    { id: 'all', label: 'All Applications' },
    { id: 'pending', label: 'Pending' },
    { id: 'shortlisted', label: 'Shortlisted' },
    { id: 'rejected', label: 'Rejected' },
    { id: 'withdrawn', label: 'Withdrawn' }
  ];

  // Sort options
  const sortOptions = [
    { id: 'newest', label: 'Newest First' },
    { id: 'oldest', label: 'Oldest First' },
    { id: 'deadline', label: 'Deadline' },
    { id: 'budget', label: 'Budget (High to Low)' },
    { id: 'budget_asc', label: 'Budget (Low to High)' }
  ];

  // Role type options
  const roleTypeOptions = [
    { id: 'all', label: 'All Roles' },
    { id: 'featured', label: 'Featured' },
    { id: 'boosted', label: 'Boosted' },
    { id: 'urgent', label: 'Urgent' }
  ];

  // State for selected values
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [roleType, setRoleType] = useState('all');

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
            Themed Dropdown Component
          </h1>
          <p className="text-gray-400 mt-2">
            A reusable dropdown component with dark mode styling and accessibility features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Filter Dropdown Example */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Application Status Filter</h2>
            <p className="text-gray-400 text-sm mb-4">
              Filter applications by their current status
            </p>
            
            <ThemedDropdown
              label="Status"
              options={applicationStatusOptions}
              value={statusFilter}
              onChange={setStatusFilter}
              variant="filter"
              placeholder="Select status"
            />
            
            <div className="mt-4 p-3 bg-white/5 rounded-lg">
              <p className="text-sm text-gray-400">Selected value:</p>
              <p className="font-medium">{applicationStatusOptions.find(opt => opt.id === statusFilter)?.label}</p>
            </div>
          </motion.div>

          {/* Sort Dropdown Example */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Sort Options</h2>
            <p className="text-gray-400 text-sm mb-4">
              Sort roles or applications by different criteria
            </p>
            
            <ThemedDropdown
              label="Sort By"
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
              variant="sort"
              placeholder="Select sorting"
            />
            
            <div className="mt-4 p-3 bg-white/5 rounded-lg">
              <p className="text-sm text-gray-400">Selected value:</p>
              <p className="font-medium">{sortOptions.find(opt => opt.id === sortBy)?.label}</p>
            </div>
          </motion.div>

          {/* Default Dropdown Example */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Role Type Filter</h2>
            <p className="text-gray-400 text-sm mb-4">
              Default variant with gradient styling
            </p>
            
            <ThemedDropdown
              label="Role Type"
              options={roleTypeOptions}
              value={roleType}
              onChange={setRoleType}
              placeholder="Select role type"
            />
            
            <div className="mt-4 p-3 bg-white/5 rounded-lg">
              <p className="text-sm text-gray-400">Selected value:</p>
              <p className="font-medium">{roleTypeOptions.find(opt => opt.id === roleType)?.label}</p>
            </div>
          </motion.div>

          {/* Disabled Dropdown Example */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Disabled State</h2>
            <p className="text-gray-400 text-sm mb-4">
              Dropdown in a disabled state
            </p>
            
            <ThemedDropdown
              label="Disabled Dropdown"
              options={applicationStatusOptions}
              value="all"
              onChange={() => {}}
              disabled={true}
              placeholder="This dropdown is disabled"
            />
            
            <div className="mt-4 p-3 bg-white/5 rounded-lg">
              <p className="text-sm text-gray-400">Usage:</p>
              <pre className="text-xs bg-black/30 p-2 rounded mt-1 overflow-x-auto">
                {`<ThemedDropdown
  disabled={true}
  // other props...
/>`}
              </pre>
            </div>
          </motion.div>
        </div>

        {/* Usage Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 mt-8"
        >
          <h2 className="text-xl font-semibold mb-4">How to Use</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-fuchsia-400 mb-2">Basic Usage</h3>
              <pre className="text-xs bg-black/30 p-3 rounded overflow-x-auto">
{`import ThemedDropdown from './components/ui/ThemedDropdown';

// In your component:
const [value, setValue] = useState('all');

<ThemedDropdown
  label="Filter"
  options={[
    { id: 'all', label: 'All Items' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' }
  ]}
  value={value}
  onChange={setValue}
/>`}
              </pre>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-blue-400 mb-2">With Variants</h3>
              <pre className="text-xs bg-black/30 p-3 rounded overflow-x-auto">
{`<ThemedDropdown
  variant="filter"  // Options: 'default', 'filter', 'sort'
  // other props...
/>`}
              </pre>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-green-400 mb-2">Props</h3>
              <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                <li><code className="bg-black/30 px-1 rounded">label</code> - Label text (optional)</li>
                <li><code className="bg-black/30 px-1 rounded">options</code> - Array of {`{id, label}`} objects</li>
                <li><code className="bg-black/30 px-1 rounded">value</code> - Currently selected value</li>
                <li><code className="bg-black/30 px-1 rounded">onChange</code> - Callback function</li>
                <li><code className="bg-black/30 px-1 rounded">variant</code> - Visual style variant</li>
                <li><code className="bg-black/30 px-1 rounded">placeholder</code> - Text when nothing is selected</li>
                <li><code className="bg-black/30 px-1 rounded">disabled</code> - Disable the dropdown</li>
                <li><code className="bg-black/30 px-1 rounded">className</code> - Additional CSS classes</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DropdownDemo; 