import React from 'react';

import AddItem from './AddItem';
import CheckList from './CheckList';

const GoalWrapper = (props) => {
  const data = props.status.goal.get('goal').toJS();
  const goalId = props.status.goal.get('goalId')

  return (
    <div className="goal">
      <CheckList goalId={goalId} data={data} GoalActions={props.GoalActions} />
      <AddItem GoalActions={props.GoalActions} />
    </div>
  );
};

export default GoalWrapper;