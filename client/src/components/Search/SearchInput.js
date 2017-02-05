import React from 'react';

const SearchInput = () => {
  return (
    <div className="search-input">
      <div className="ui fluid left icon input">
        <i aria-hidden="true" className="search icon"></i>
        <input type="text" placeholder="태그 검색..." />
      </div>
    </div>
  );
};

export default SearchInput;