import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import RoleList from '../components/roles/RoleList';
import AddRoleForm from '../components/roles/AddRoleForm';

const DirectorRoles = () => {
  const [showAddRoleForm, setShowAddRoleForm] = useState(false);

  const handleAddRole = (roleData) => {
    console.log('New role data:', roleData);
    // Here you would typically send this data to your backend
    setShowAddRoleForm(false);
  };

  return (
    <DashboardLayout userRole="director">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Roles</h1>
          <motion.button
            onClick={() => setShowAddRoleForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-fuchsia-500 to-blue-600 rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
            <span>Add New Role</span>
          </motion.button>
        </div>

        {showAddRoleForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <AddRoleForm 
                onSubmit={handleAddRole} 
                onCancel={() => setShowAddRoleForm(false)} 
              />
            </div>
          </div>
        )}

        <RoleList />
      </div>
    </DashboardLayout>
  );
};

export default DirectorRoles; 