import React from 'react';

import AddItem from './AddItem';
import CheckList from './CheckList';

const GoalWrapper = (props) => {
  const data = props.status.goal.get('goal').toJS();

  return (
    <div className="goal">
      <CheckList data={data} />
      <AddItem GoalActions={props.GoalActions} />
    </div>
  );
};

export default GoalWrapper;