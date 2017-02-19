import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as auth from 'redux/modules/auth';
import * as post from 'redux/modules/post';
import * as follow from 'redux/modules/follow';
import * as bookmark from 'redux/modules/bookmark';

import { Post } from 'components';

class Feed extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  async componentDidMount() {
    const {PostActions, FollowActions} = this.props;

    try {
      this.checkSession();
      await PostActions.getPosts('feed');

      const session = this.props.status.auth.getIn(['session']).toJS();
      await FollowActions.getFollowee(session.common_profile.username);
    } catch (e) {
    }
  }

  checkSession = async () => {
    const {AuthActions} = this.props;

    await AuthActions.getInfo();

    // check status
    const session = this.props.status.auth.getIn(['session']).toJS();
    if (!session._id) {
      this.context.router.push('/auth/signin');
    }
  }

  render() {
    const {PostActions, FollowActions, BookmarkActions} = this.props;
    const data = this.props.status.post.toJS();
    const session = this.props.status.auth.getIn(['session']).toJS();
    const followee = this.props.status.follow.getIn(['followee']).toJS();

    const postList = data.post.map(
      (post, index) => (
        <Post
          PostActions={PostActions}
          FollowActions={FollowActions}
          BookmarkActions={BookmarkActions}
          followee={followee}
          session={session}
          data={post}
          key={post._id} />
      )
    );

    return (
      <div>
        {postList}
      </div>
    );
  }

  componentWillUnmount() {
    const {PostActions} = this.props;

    PostActions.resetPost();
  }

}

Feed = connect(
  state => ({
    status: {
      auth: state.auth,
      post: state.post,
      follow: state.follow,
      bookmark: state.bookmark
    }
  }),
  dispatch => ({
    AuthActions: bindActionCreators(auth, dispatch),
    PostActions: bindActionCreators(post, dispatch),
    FollowActions: bindActionCreators(follow, dispatch),
    BookmarkActions: bindActionCreators(bookmark, dispatch)
  })
)(Feed);

export default Feed;