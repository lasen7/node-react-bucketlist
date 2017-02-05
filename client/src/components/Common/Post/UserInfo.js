import React from 'react';

import { Dropdown } from 'semantic-ui-react'

const UserInfo = () => {
  return (
    <div className="user-info">

      <div className="thumbnail">
        <img alt="" src="http://semantic-ui.com/images/avatar/small/jenny.jpg" />
      </div>

      <div className="username"><span>hspark</span></div>

      <div className="option-wrapper">
        <div className="option">
          <Dropdown icon="ellipsis vertical">
            <Dropdown.Menu>
              <Dropdown.Item text='신고' />
              <Dropdown.Item text='수정' />
              <Dropdown.Item text='삭제' />
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="option"><span>팔로우</span></div>
      </div>

    </div>
  );
};

export default UserInfo;