import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as auth from 'redux/modules/auth';

import NotFound from './NotFound';
import { Background, Logo, Signin, Signup } from 'components';

import alert from 'alertifyjs';

class Auth extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  async componentDidMount() {
    const {AuthActions} = this.props;

    await AuthActions.getInfo();

    // check status
    const session = this.props.status.auth.getIn(['session']).toObject();
    if (session._id) {
      this.context.router.push('/');
    }
  }

  handleSignup = async (username, password, fullname, email, gender) => {
    const {AuthActions} = this.props;

    try {
      const result = await AuthActions.signup(email, fullname, username, password, gender);
      alert.success('로그인 해 주세요');
    } catch (e) {
      /**
       * Error code:
       *  1. Invalid email
       *  2. Invalid fullname
       *  3. Invalid username
       *  4. Invalid password
       *  5. Invalid gender
       *  6. Duplicate username
       *  7. Duplicate email
       */
      const err = this.props.status.auth.getIn(['requests', 'signup', 'error']).response.data
      alert.error(err.msg);
      return err.code;
    }
  }

  handleSignin = async (username, password) => {
    const {AuthActions} = this.props;

    try {
      const result = await AuthActions.signin(username, password);
      alert.success('로그인 성공');
      this.context.router.push('/');
    } catch (e) {
      /**
       * Error code:
       *  1. Invalid username
       *  2. Invalid password
       *  3. Invalid auth
       */
      const err = this.props.status.auth.getIn(['requests', 'signin', 'error']).response.data
      alert.error(err.msg);
    }
  }

  render() {
    const {signin} = this.props.params;
    const {location} = this.props;

    let isSignin = /^signin$/.test(signin);
    let isSignup = /^signup$/.test(signin);

    if (signin && !isSignin && !isSignup) {
      return (
        <NotFound />
      );
    }

    if (!signin) {
      isSignin = true;
    }

    return (

      <div className="auth">
        <Background />
        <Logo text="BUCKET LIST" />
        {isSignin ?
          <Signin
            location={location}
            onSignin={this.handleSignin} /> :
          <Signup
            location={location}
            onSignup={this.handleSignup} />}
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