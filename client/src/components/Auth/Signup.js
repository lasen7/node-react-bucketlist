import React, { Component } from 'react';

import { Dropdown } from 'semantic-ui-react'

class Signup extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  state = {
    leave: false,
  };

  leaveTo = (path) => {
    this.setState({ leave: true });
    setTimeout(() => this.context.router.push(path), 700);
  };

  render() {
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

    return (
      <div className="signup">
        <div className={`box animated fadeInRight ${this.state.leave ? 'fadeOutLeft' : ''}`}>
          <div className="ui form">
            <div className="field">
              <label>아이디</label>
              <input placeholder="아이디" />
            </div>

            <div className="field">
              <label>이름</label>
              <input placeholder="이름" />
            </div>

            <div className="field">
              <label>이메일</label>
              <div className="ui left icon input">
                <i className="mail icon"></i>
                <input placeholder="이메일" />
              </div>
            </div>

            <div className="field">
              <label>성별</label>
              <Dropdown placeholder='성별' fluid selection options={genderOptions} />
            </div>

            <div className="ui divider">
            </div>

            <div className="field">
              <button className="ui green button">회원가입</button>
            </div>

            <div className="field">
              <button
                className="ui button"
                onClick={() => this.leaveTo('/auth/signin')}>취소</button>
            </div>

          </div>
        </div>

      </div>
    );
  }
}

export default Signup;