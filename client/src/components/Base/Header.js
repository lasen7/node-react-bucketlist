import React, { Component } from 'react';

import { Link } from 'react-router';

class Header extends Component {
  render() {
    return (

      <div className="header">
        <div className="top">
          <Link to="/" className="top-logo">BUCKET LIST</Link>

          <div className="menu">
            <div className="icon-wrapper">
              <i className="user icon" ></i>
            </div>

            <div className="icon-wrapper">
              <i className="search icon" ></i>
            </div>

            <div className="icon-wrapper">
              <i className="write icon" ></i>
            </div>

            <div className="icon-wrapper">
              <i className="users icon" ></i>
            </div>

            <div className="icon-wrapper">
              <i className="home icon" ></i>
            </div>
          </div>

        </div>

      </div>
    )
  }
}

export default Header;

      /*<Menu icon fluid widths={5}>
        <Menu.Item name='gamepad' active={activeItem === 'gamepad'} onClick={this.handleItemClick}>
          <Icon name='gamepad' />
        </Menu.Item>

        <Menu.Item name='video camera' active={activeItem === 'video camera'} onClick={this.handleItemClick}>
          <Icon name='video camera' />
        </Menu.Item>

        <Menu.Item name='video play' active={activeItem === 'video play'} onClick={this.handleItemClick}>
          <Icon name='video play' />
        </Menu.Item>

        <Menu.Item name='video play' active={activeItem === 'video play'} onClick={this.handleItemClick}>
          <Icon name='video play' />
        </Menu.Item>

        <Menu.Item name='video play' active={activeItem === 'video play'} onClick={this.handleItemClick}>
          <Icon name='video play' />
        </Menu.Item>
      </Menu>*/