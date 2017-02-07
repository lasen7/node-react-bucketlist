import React, { Component } from 'react';

import { PageTitle, PreviewList } from 'components';

class Bookmark extends Component {
  render() {
    return (
      <div>
        <PageTitle title="북마크" />
        <PreviewList />
      </div>
    );
  }
}

export default Bookmark;