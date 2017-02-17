import React from 'react';

import FollowInfo from './FollowInfo';

const FollowInfoList = ({isFollowing, follow}) => {
  const empty = (
    <div className="empty">
      {`${isFollowing ? '팔로잉' : '팔로우'} 하는 사람이 없습니다`}
    </div>
  );

  const followList = follow.map(
    follow => (
      <FollowInfo
        key={follow._id}
        isFollowing={isFollowing}
        profile={isFollowing ? follow.followee.common_profile : follow.follower.common_profile}
      />
    ));

  return (
    <div className="follow-info-list">
      {follow.length === 0 ? empty : followList}
    </div>
  );
};

export default FollowInfoList;