import React from 'react';

const SearchResult = (props, context) => {
  const leaveTo = (path) => {
    context.router.push(path);
  };

  return (
    <div className="search-result" onClick={() => leaveTo('/search/tagname')}>
      <span className="icon-wrapper"><i className="hashtag icon"></i></span>
      <span className="tagname">가나다라마바사</span>
      <span className="count">1000</span>
    </div>
  );
};

SearchResult.contextTypes = {
  router: React.PropTypes.object
};

export default SearchResult;