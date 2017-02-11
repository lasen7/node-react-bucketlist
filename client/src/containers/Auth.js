import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as auth from 'redux/modules/auth';

import { Background, Logo } from 'components';

import alert from 'alertifyjs';

class Auth extends Component {
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
    const session = this.props.status.auth.getIn(['session']).toJS();
    if (session._id) {
      this.context.router.push('/');
    }
  }

  render() {
    const {AuthActions, status, children} = this.props;

    return (
      <div className="auth">
        <Background />
        <Logo text="BUCKET LIST" />
        {React.cloneElement(children, { status, AuthActions })}
      </div>
    );
  }
}

Auth = connect(
  state => ({
    status: {
      auth: state.auth
    }
  }),
  dispatch => ({
    AuthActions: bindActionCreators(auth, dispatch)
  })
)(Auth);

export default Auth;