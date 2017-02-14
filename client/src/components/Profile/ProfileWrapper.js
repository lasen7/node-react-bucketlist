import React from 'react';

import UserInfo from './UserInfo';
import Information from './Information';

const ProfileWrapper = (props) => {
  return (
    <div className="profile">
      <UserInfo {...props} />
      <Information {...props} />
    </div>
  );
};

export default ProfileWrapper;