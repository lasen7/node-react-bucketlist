import React from 'react';

import Year from './Year';
import CheckItem from './CheckItem';

const CheckList = () => {
  // map()
  // Year, CheckItem, Divider 조합

  return (
    <div className="check-list">
      <Year />
      <CheckItem />
      <CheckItem />
      <div className="ui divider"></div>
    </div>
  );
};

export default CheckList;