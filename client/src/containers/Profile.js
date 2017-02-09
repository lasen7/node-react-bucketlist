import React, { Component } from 'react';

import { ProfileWrapper } from 'components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as auth from 'redux/modules/auth';

class Profile extends Component {
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

  }),
  dispatch => ({
    AuthActions: bindActionCreators(auth, dispatch)
  })
)(Profile);

export default Profile;