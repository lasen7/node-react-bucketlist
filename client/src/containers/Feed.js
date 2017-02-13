import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as auth from 'redux/modules/auth';
import * as post from 'redux/modules/post';

import { Post } from 'components';

class Feed extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  async componentDidMount() {
    const {PostActions} = this.props;

    try {
      this.checkSession();
      await PostActions.getPosts('feed');
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
    const data = this.props.status.post.toJS();
    const session = this.props.status.auth.getIn(['session']).toJS();

    const postList = data.post.map(
      (post, index) => (
        <Post
          PostActions={this.props.PostActions}
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
      post: state.post
    }
  }),
  dispatch => ({
    AuthActions: bindActionCreators(auth, dispatch),
    PostActions: bindActionCreators(post, dispatch)
  })
)(Feed);

export default Feed;