import React, { Component } from 'react';

import { Header, Post } from 'components';

class Feed extends Component {
  render() {
    return (
      <div>
        <Header />
        <Post />
      </div>
    );
  }
}

export default Feed;