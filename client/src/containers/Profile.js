import React, { Component } from 'react';

import { ProfileWrapper } from 'components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as auth from 'redux/modules/auth';

class Profile extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  componentDidMount() {
    this.checkSession();
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
      auth: state.auth
    }
  }),
  dispatch => ({
    AuthActions: bindActionCreators(auth, dispatch)
  })
)(Profile);

export default Profile;