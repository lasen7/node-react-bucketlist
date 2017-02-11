import React from 'react';

import FollowInfo from './FollowInfo';

const FollowInfoList = () => {
  // const empty = (
  //   <div className="empty">팔로워가 없습니다</div>
  // );

  return (
    <div className="follow-info-list">
      <FollowInfo />
      <FollowInfo />
      <FollowInfo />

      {/*{empty}*/}
    </div>
  );
};

export default FollowInfoList;