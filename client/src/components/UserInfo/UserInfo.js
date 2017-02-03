import React from 'react';

import './UserInfo.css';

const UserInfo = ({data}) => {
  return (
    <div className="card">
      <div>
        {data.username}
      </div>
      <div>
        {data.email}
      </div>
    </div>
  );
};

export default UserInfo;