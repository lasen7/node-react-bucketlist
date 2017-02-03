import React, { Component } from 'react';

import { Background, Title, Signin } from 'components';

class Auth extends Component {
  render() {
    return (
      <div className="auth">
        <Background />
        <Title text="BUCKET LIST" />
        <Signin />
      </div>
    );
  }
}

export default Auth;