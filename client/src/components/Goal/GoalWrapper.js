import React from 'react';

import AddItem from './AddItem';
import CheckList from './CheckList';

const GoalWrapper = () => {
  return (
    <div className="goal">
      <CheckList />
      <AddItem />
    </div>
  );
};

export default GoalWrapper;