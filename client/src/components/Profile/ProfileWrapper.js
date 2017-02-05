import React from 'react';

import UserInfo from './UserInfo';
import Information from './Information';

const ProfileWrapper = () => {
  return (
    <div className="profile">
      <UserInfo />
      <Information />
    </div>
  );
};

export default ProfileWrapper;