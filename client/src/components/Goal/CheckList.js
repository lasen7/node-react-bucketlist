import React from 'react';

import Year from './Year';
import CheckItem from './CheckItem';

const CheckList = ({data}) => {

  const checkList = data.map((value, index, arr) => {
    let curr = arr[index];
    let prev = arr[index - 1];
    let currDate = curr.date.substring(0, 4);
    let prevDate = prev && prev.date.substring(0, 4);

    if (index === 0) {
      return (
        <div key={index}>
          <Year
            key={currDate}
            year={currDate} />
          <CheckItem
            data={curr}
            key={curr._id}
          />
        </div>
      );
    }

    if (currDate !== prevDate) {
      return (
        <div key={index}>
          <div className="ui divider"></div>
          <Year
            key={currDate}
            year={currDate} />
          <CheckItem
            data={curr}
            key={curr._id}
          />
        </div>
      );
    }

    return (
      <CheckItem
        data={curr}
        key={curr._id}
      />
    );
  });

  return (
    <div className="check-list">
      {checkList}
      <div className="ui divider"></div>
    </div>
  );
};

export default CheckList;