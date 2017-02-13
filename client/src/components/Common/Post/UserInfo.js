import React from 'react';

import { Link } from 'react-router';

import { Dropdown } from 'semantic-ui-react'

const UserInfo = ({onDeletePost, onEditPost, session, writer, follow}) => {

  // TODO: write/postId로 링크를 해야하는데 이 컴포넌트에서 할지
  // 아니면 Post 컴포넌트에서 할지???

  const followView = (
    <div className="option"><span>팔로우</span></div>
  );

  return (
    <div className="user-info">

      <div className="thumbnail">
        <img alt="" src="http://semantic-ui.com/images/avatar/small/jenny.jpg" />
      </div>

      <div className="username">
        <Link style={{ color: 'black' }} to={`/profile/${writer}`}><span>{writer}</span></Link>
      </div>

      <div className="option-wrapper">
        <div className="option">
          <Dropdown icon="ellipsis vertical">
            <Dropdown.Menu>
              {session.common_profile.username !== writer ? <Dropdown.Item text='신고' /> : undefined}
              {session.common_profile.username === writer ? <Dropdown.Item text='수정' onClick={onEditPost} /> : undefined}
              {session.common_profile.username === writer ? <Dropdown.Item text='삭제' onClick={onDeletePost} /> : undefined}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {!follow ? followView : undefined}
      </div>
    </div>
  );
};

export default UserInfo;