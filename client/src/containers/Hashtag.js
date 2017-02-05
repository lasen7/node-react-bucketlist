import React, { Component } from 'react';

import { Search, SearchInput, SearchResultList } from 'components';

class Hashtag extends Component {
  render() {
    return (
      <div>
        <Search>
          <SearchInput />
          <SearchResultList />
        </Search>
      </div>
    );
  }
}

export default Hashtag;