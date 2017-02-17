import React, { Component } from 'react';

import { ProfileWrapper } from 'components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as auth from 'redux/modules/auth';
import * as profile from 'redux/modules/profile';
import * as follow from 'redux/modules/follow';

import alert from 'alertifyjs';

class Profile extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  componentDidMount() {
    const {params} = this.props;

    this.checkSession();

    // get user profile by username
    this.getProfile(params.username);
  }

  checkSession = async () => {
    const {AuthActions} = this.props;

    await AuthActions.getInfo();

    // check status
    const session = this.props.status.auth.getIn(['session']).toObject();
    if (!session._id) {
      this.context.router.push('/auth/signin');
    }
  }

  getProfile = async (username) => {
    try {
      await this.props.ProfileActions.getProfile(username);
    } catch (e) {
      alert.error('에러가 발생했습니다');
      this.context.router.push('/');
    }
  }

  render() {
    return (
      <div>
        <ProfileWrapper {...this.props} />
      </div>
    );
  }
}

Profile = connect(
  state => ({
    status: {
      auth: state.auth,
      profile: state.profile,
      follow: state.follow
    }
  }),
  dispatch => ({
    AuthActions: bindActionCreators(auth, dispatch),
    ProfileActions: bindActionCreators(profile, dispatch),
    FollowActions: bindActionCreators(follow, dispatch)
  })
)(Profile);

export default Profile;