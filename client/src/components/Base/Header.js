import React, { Component } from 'react';

import { Link } from 'react-router';

class Header extends Component {
  render() {
    const {username} = this.props;

    return (

      <div className="header">
        <div className="top">
          <Link to="/" className="top-logo">BUCKET LIST</Link>

          <div className="menu">
            <div className="icon-wrapper">
              <Link to={`/profile/${username}`}><i className="user icon" ></i></Link>
            </div>

            <div className="icon-wrapper">
              <Link to="/search"><i className="search icon" ></i></Link>
            </div>

            <div className="icon-wrapper">
              <Link to="/write"><i className="write icon" ></i></Link>
            </div>

            <div className="icon-wrapper">
              <Link to="/friend"><i className="users icon" ></i></Link>
            </div>

            <div className="icon-wrapper">
              <Link to="/"><i className="home icon" ></i></Link>
            </div>
          </div>

        </div>

      </div>
    )
  }
}

Header.propTypes = {
  username: React.PropTypes.string
}

export default Header;