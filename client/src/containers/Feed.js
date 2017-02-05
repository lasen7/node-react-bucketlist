import React, { Component } from 'react';

import { Post } from 'components';

class Feed extends Component {
  render() {
    return (
      <div>        
        <Post />
        <Post />
      </div>
    );
  }
}

export default Feed;