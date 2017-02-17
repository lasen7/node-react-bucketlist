import React from 'react';

import { Modal } from 'semantic-ui-react'
import { FollowInfoList } from 'components';

const Information = (props, context) => {
  const {status, FollowActions} = props;
  const profile = status.profile.get('profile').toJS();
  const followee = status.follow.get('followee').toJS();
  const follower = status.follow.get('follower').toJS();

  const leaveTo = (path) => {
    context.router.push(path);
  };

  const followerView = (
    <div className="content">
      <div>{profile.count.follower}</div>
      <div>팔로워</div>
    </div>
  );

  const followeeView = (
    <div className="content">
      <div>{profile.count.followee}</div>
      <div>팔로잉</div>
    </div>
  );

  const handleFollowee = async () => {
    try {
      await FollowActions.getFollowee(profile.username);
    } catch (e) {
    }
  };

  const handleFollower = async () => {
    try {
      await FollowActions.getFollower(profile.username);
    } catch (e) {
    }
  };

  return (
    <div className="information">
      <div className="ui three column grid">
        <div className="row">
          <div className="column">
            <div className="content" onClick={() => leaveTo('/post/1234')}>
              <div>{profile.count.post}</div>
              <div>게시물</div>
            </div>
          </div>

          <div className="column">
            <Modal size="small" trigger={followerView} onOpen={handleFollower}>
              <Modal.Header>팔로워</Modal.Header>
              <FollowInfoList
                isFollowing={false}
                follow={follower}
              />
            </Modal>
          </div>

          <div className="column">
            <Modal size="small" trigger={followeeView} onOpen={handleFollowee}>
              <Modal.Header>팔로잉</Modal.Header>
              <FollowInfoList
                isFollowing={true}
                follow={followee} />
            </Modal>
          </div>
        </div>

        <div className="row">
          <div className="column">
            <div className="content" onClick={() => leaveTo('/bookmark/1234')}>
              <div>{profile.count.bookmark}</div>
              <div>북마크</div>
            </div>
          </div>
          <div className="column">
            <div className="content" onClick={() => leaveTo('/goal/1234')}>
              <div>{profile.count.goal.done} / {profile.count.goal.total}</div>
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