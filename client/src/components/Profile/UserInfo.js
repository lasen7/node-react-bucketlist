import React from 'react';

import { Popup, Icon } from 'semantic-ui-react';

const UserInfo = ({AuthActions}) => {
  const handleLogout = async () => {
    console.log('AuthActions: ', AuthActions);

    await AuthActions.logout();

    document.location.href = '/auth';
  };

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

      <div className="username">username</div>

      <div className="fullname">
        박환석
        <i className="write icon"></i>
      </div>

    </div>
  );
};

export default UserInfo;