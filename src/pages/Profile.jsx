import React from 'react';
import { useParams } from 'react-router-dom';
import ProfileDashboard from '../components/ProfileDashboard';

const Profile = () => {
  const { userId } = useParams();
  
  // Mock user data for testing
  const mockUser = {
    uid: userId || '123',
    displayName: 'John Doe',
    userType: 'actor',
    email: 'test@example.com'
  };
  
  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white pt-16">
      <ProfileDashboard 
        userId={userId || '123'}
        isOwnProfile={true}
        currentUser={mockUser}
      />
    </div>
  );
};

export default Profile; 