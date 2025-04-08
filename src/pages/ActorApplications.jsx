import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import ApplicationList from '../components/applications/ApplicationList';

const ActorApplications = () => {
  return (
    <DashboardLayout userRole="actor">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Applications</h1>
          <div className="flex space-x-2">
            <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm">
              <option value="all">All Applications</option>
              <option value="pending">Pending</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="rejected">Rejected</option>
              <option value="withdrawn">Withdrawn</option>
            </select>
            <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm">
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="deadline">Deadline</option>
            </select>
          </div>
        </div>

        <ApplicationList />
      </div>
    </DashboardLayout>
  );
};

export default ActorApplications; 