import React, { Component } from 'react';

import alert from 'alertifyjs';

class Signin extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  state = {
    leave: false,
    username: '',
    password: ''
  };

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = () => {
    const {username, password} = this.state;
    const {onSignin} = this.props;

    onSignin(username, password);
  }

  leaveTo = (path) => {
    this.setState({ leave: true });
    setTimeout(() => this.context.router.push(path), 700);
  };

  render() {
    const {username, password} = this.state;

    return (
      <div className="signin">
        <div className={`box animated fadeInRight ${this.state.leave ? 'fadeOutLeft' : ''}`}>
          <div className="ui form">
            <div className="field">
              <label>아이디</label>
              <div className="ui left icon input">
                <i aria-hidden="true" className="user icon"></i>
                <input
                  name="username"
                  placeholder="아이디"
                  value={username}
                  onChange={this.handleChange} />
              </div>
            </div>

            <div className="field">
              <label>비밀번호</label>
              <div className="ui left icon input">
                <i aria-hidden="true" className="lock icon"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="비밀번호"
                  value={password}
                  onChange={this.handleChange} />
              </div>
            </div>

            <div className="field">
              <button
                type="submit"
                className="ui fluid button"
                onClick={this.handleSubmit}>로그인</button>
            </div>

            <div className="ui horizontal inverted divider">
              OR
             </div>

            <div className="field">
              <button className="ui facebook fluid button">
                <i aria-hidden="true" className="facebook icon"></i>
                페이스북
              </button>
            </div>

            <div className="field">
              <button className="ui google plus fluid button">
                <i aria-hidden="true" className="google icon"></i>
                구글
              </button>
            </div>

            <div className="field">
              <button
                className="ui green fluid button"
                onClick={() => this.leaveTo('/auth/signup')}>
                회원가입
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

Signin.propTypes = {
  onSignin: React.PropTypes.func
};

export default Signin;