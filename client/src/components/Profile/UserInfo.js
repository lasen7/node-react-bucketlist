import React from 'react';

const UserInfo = ({AuthActions, status}) => {
  const handleLogout = async () => {
    console.log('AuthActions: ', AuthActions);

    await AuthActions.logout();

    document.location.href = '/auth';
  };

  // status.auth is Map
  const {auth} = status;
  const username = auth.getIn(['session', 'common_profile', 'username']);
  const fullname = auth.getIn(['session', 'common_profile', 'fullname']);

  return (
    <div className="user-info">
      <div
        className="alarm-wrapper"
        onClick={handleLogout}>
        <i className="teal log out circular inverted icon"></i>
      </div>

      <div className="thumbnail-wrapper">
        <i className="write teal circular inverted icon"></i>
        <img className="ui thumbnail circular image" src="https://imgh.us/user_11.svg" alt="" />
      </div>

      <div className="username">{username}</div>

      <div className="fullname">
        {fullname}
        <i className="write icon"></i>
      </div>

    </div>
  );
};

export default UserInfo;