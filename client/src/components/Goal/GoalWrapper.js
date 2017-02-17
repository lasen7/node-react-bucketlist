import React from 'react';

import AddItem from './AddItem';
import CheckList from './CheckList';

const GoalWrapper = (props) => {
  return (
    <div className="goal">
      <CheckList />
      <AddItem GoalActions={props.GoalActions} />
    </div>
  );
};

export default GoalWrapper;