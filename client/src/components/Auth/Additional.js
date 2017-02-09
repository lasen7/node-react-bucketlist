import React, { Component } from 'react';

import alert from 'alertifyjs';

class Additional extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  state = {
    leave: false,
    username: ''
  };

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({ [name]: value });
  }

  handleSignupOauth = async () => {
    const {username} = this.state;

    try {
      await this.props.AuthActions.signupOauth(username);
      alert.success('반갑습니다');
      this.context.router.push('/');
    } catch (e) {
      alert.error(e.response.data.msg);
    }
  }

  leaveTo = (path) => {
    this.setState({ leave: true });
    setTimeout(() => this.context.router.push(path), 700);
  };

  render() {
    const {username} = this.state;

    return (
      <div className="additional">
        <div className={`box animated fadeInRight ${this.state.leave ? 'fadeOutLeft' : ''}`}>
          <div className="ui form">
            <div className="field">
              <label>아이디</label>
              <input
                name="username"
                placeholder="아이디"
                value={username}
                onChange={this.handleChange} />
            </div>

            <div className="ui divider">
            </div>

            <div className="equal width fields">
              <div className="field">
                <button
                  className="ui green button"
                  onClick={this.handleSignupOauth}>회원가입</button>
              </div>

              <div className="field">
                <button
                  className="ui button"
                  onClick={() => this.leaveTo('/auth/signin')}>취소</button>
              </div>
            </div>

          </div>
        </div>

      </div>
    );
  }
}

Additional.propTypes = {
  onSignup: React.PropTypes.func
};

export default Additional;