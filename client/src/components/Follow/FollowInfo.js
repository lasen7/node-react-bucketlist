import React from 'react';

const FollowInfo = () => {
  return (
    <div className="follow-info">

      <div className="thumbnail">
        <img alt="" src="http://semantic-ui.com/images/avatar/small/jenny.jpg" />
      </div>

      <div className="username"><span>hspark</span></div>

      <button className="teal ui tiny button">팔로우</button>

    </div>
  );
};

export default FollowInfo;