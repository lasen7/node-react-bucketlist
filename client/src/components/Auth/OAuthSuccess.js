import React, { Component } from 'react';

import alert from 'alertifyjs';

class OAuthSuccess extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  componentDidMount() {
    this.checkSession();
  }

  checkSession = async () => {
    await this.props.AuthActions.getInfo();

    const session = this.props.status.auth.getIn(['session']).toObject();
    if (!session._id) {
      alert.error('다시 로그인 해 주세요');
      this.context.router.push('/');
      return;
    }

    alert.success('환영합니다');
    this.context.router.push('/');
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}

OAuthSuccess.propTypes = {
  status: React.PropTypes.object,
  AuthActions: React.PropTypes.object
};

export default OAuthSuccess;