import React from 'react';

const UserInfo = ({AuthActions, status}) => {
  const handleLogout = async () => {
    console.log('AuthActions: ', AuthActions);

    await AuthActions.logout();

    document.location.href = '/auth';
  };

  const {auth} = status;
  const username = auth.getIn(['session', 'common_profile', 'username']);
  const profile = status.profile.get('profile').toJS();

  return (
    <div className="user-info">
      <div
        className="alarm-wrapper"
        onClick={handleLogout}>
        {username === profile.username ?
          <i className="teal log out circular inverted icon"></i> : undefined}
      </div>

      <div className="thumbnail-wrapper">
        {username === profile.username ?
          <i className="write teal circular inverted icon"></i> : undefined}
        <img className="ui thumbnail circular image" src="https://imgh.us/user_11.svg" alt="" />
      </div>

      <div className="username">{profile.username}</div>

      <div className="fullname">
        {profile.fullname}
        <i className="write icon"></i>
      </div>

    </div>
  );
};

export default UserInfo;