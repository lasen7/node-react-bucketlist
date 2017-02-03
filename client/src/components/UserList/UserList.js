import React from 'react';

import { UserInfo } from 'components';

import './UserList.css';

const UserList = ({users}) => {
  const userList = users.map(
    (user, index) => (
      <UserInfo
        data={user}
        key={user.id}
        index={index}
        />
    ));

  return (
    <div className="userList">
      {userList}
    </div>
  );
};

export default UserList;