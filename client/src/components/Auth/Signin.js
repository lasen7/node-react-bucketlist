import React from 'react';

const Signin = () => {
  return (
    <div className="signin">
      <div className="box animated fadeInRight">
        <div className="ui form">
          <div className="field">
            <label>아이디</label>
            <div className="ui left icon input">
              <i aria-hidden="true" className="user icon"></i>
              <input placeholder="아이디" />
            </div>
          </div>

          <div className="field">
            <label>비밀번호</label>
            <div className="ui left icon input">
              <i aria-hidden="true" className="lock icon"></i>
              <input placeholder="비밀번호" />
            </div>
          </div>

          <div className="field">
            <button type="submit" className="ui fluid button">로그인</button>
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
            <button className="ui green fluid button">
              회원가입
          </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Signin;