import React, { Component } from 'react';

import NotFound from './NotFound';
import { Background, Logo, Signin, Signup } from 'components';

class Auth extends Component {
  render() {
    const {signin} = this.props.params;
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
        {isSignin ? <Signin location={this.props.location} /> : <Signup location={this.props.location} />}
      </div>
    );
  }
}

export default Auth;