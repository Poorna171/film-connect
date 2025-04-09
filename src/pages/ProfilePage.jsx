import React from 'react';
import { useParams } from 'react-router-dom';
import UserProfile from '../components/UserProfile';

const ProfilePage = () => {
  const { userId } = useParams();
  const isOwnProfile = !userId;

  const currentUserId = 'current-user-id';
  const profileId = userId || currentUserId;

  return (
    <div className="h-full">
      <UserProfile userId={profileId} isOwnProfile={isOwnProfile} />
    </div>
  );
};

export default ProfilePage;