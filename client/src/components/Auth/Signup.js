import React, { Component } from 'react';

import { Dropdown } from 'semantic-ui-react'

import alert from 'alertifyjs';

const genderOptions = [
  {
    text: '남자',
    value: 'male'
  },
  {
    text: '여자',
    value: 'female'
  }
];

class Signup extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  state = {
    leave: false,
    username: '',
    password: '',
    fullname: '',
    email: '',
    gender: ''
  };

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({ [name]: value });
  }

  handleSelect = (e, data) => {
    const {name, value} = data;
    this.setState({ [name]: value });
  }

  handleSignup = async () => {
    const {username, password, fullname, email, gender} = this.state;

    try {
      const result = await this.props.AuthActions.signup(email, fullname, username, password, gender);
      alert.success('로그인 해 주세요');
      this.leaveTo('/auth/signin');
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

      alert.error(e.response.data.msg);
    }
  }

  leaveTo = (path) => {
    this.setState({ leave: true });
    setTimeout(() => this.context.router.push(path), 700);
  };

  render() {
    const {username, password, fullname, email, gender} = this.state;

    return (
      <div className="signup">
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

            <div className="field">
              <label>비밀번호</label>
              <input
                type="password"
                name="password"
                placeholder="비밀번호"
                value={password}
                onChange={this.handleChange} />
            </div>

            <div className="field">
              <label>이름</label>
              <input
                name="fullname"
                placeholder="이름"
                value={fullname}
                onChange={this.handleChange} />
            </div>

            <div className="field">
              <label>이메일</label>
              <div className="ui left icon input">
                <i className="mail icon"></i>
                <input
                  name="email"
                  placeholder="이메일"
                  value={email}
                  onChange={this.handleChange} />
              </div>
            </div>

            <div className="field">
              <label>성별</label>
              <Dropdown name="gender" placeholder='성별' fluid selection options={genderOptions} onChange={this.handleSelect} />
            </div>

            <div className="ui divider">
            </div>

            <div className="equal width fields">
              <div className="field">
                <button
                  className="ui green button"
                  onClick={this.handleSignup}>회원가입</button>
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

Signup.propTypes = {
  AuthActions: React.PropTypes.object
};

export default Signup;