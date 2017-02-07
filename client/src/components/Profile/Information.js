import React from 'react';

import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { FollowInfoList } from 'components';

const Information = (props, context) => {

  const leaveTo = (path) => {
    context.router.push(path);
  };

  const follower = (
    <div className="content">
      <div>1</div>
      <div>팔로워</div>
    </div>
  );

  const followee = (
    <div className="content">
      <div>1</div>
      <div>팔로잉</div>
    </div>
  );

  return (
    <div className="information">
      <div className="ui three column grid">
        <div className="row">
          <div className="column">
            <div className="content" onClick={() => leaveTo('/post/1234')}>
              <div>1</div>
              <div>게시물</div>
            </div>
          </div>

          <div className="column">
            <Modal size="small" trigger={follower}>
              <Modal.Header>팔로워</Modal.Header>
              <FollowInfoList />
            </Modal>
          </div>

          <div className="column">
            <Modal size="small" trigger={followee}>
              <Modal.Header>팔로잉</Modal.Header>
              <FollowInfoList />
            </Modal>
          </div>
        </div>

        <div className="row">
          <div className="column">
            <div className="content" onClick={() => leaveTo('/bookmark/1234')}>
              <div>1</div>
              <div>북마크</div>
            </div>
          </div>
          <div className="column">
            <div className="content" onClick={() => leaveTo('/goal/1234')}>
              <div>1</div>
              <div>목표</div>
            </div>
          </div>
          <div className="column">
          </div>
        </div>
      </div>

    </div>
  );
};

Information.contextTypes = {
  router: React.PropTypes.object
};

export default Information;