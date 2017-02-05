import React from 'react';

const UserInfo = () => {
  return (
    <div className="user-info">
      <div className="alarm-wrapper"><i className="alarm outline large icon"></i></div>

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