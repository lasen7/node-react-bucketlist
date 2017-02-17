import React from 'react';

const FollowInfo = ({profile, isFollowing}) => {
  return (
    <div className="follow-info">

      <div className="thumbnail">
        <img alt="" src="http://semantic-ui.com/images/avatar/small/jenny.jpg" />
      </div>

      <div className="username"><span>{profile.username}</span></div>

      <button className="teal ui tiny button">{isFollowing ? '팔로잉' : '팔로우'}</button>

    </div>
  );
};

export default FollowInfo;