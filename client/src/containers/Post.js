import React, { Component } from 'react';

import { PageTitle, PreviewList } from 'components';

class Post extends Component {
  render() {
    return (
      <div>
        <PageTitle title="게시물" />
        <PreviewList />
      </div>
    );
  }
}

export default Post;