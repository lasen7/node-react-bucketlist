import React from 'react';

import SearchResult from './SearchResult';
import Empty from './Empty';

const SearchResultList = () => {
  return (
    <div>
      {/*<Empty />*/}
      
      <SearchResult />
      <SearchResult />
      <SearchResult />
    </div>
  );
};

export default SearchResultList;