import React from 'react';
import { Checkbox } from 'semantic-ui-react'

const CheckItem = ({goalId, data, GoalActions }) => {

  const handleDelete = async () => {
    try {
      await GoalActions.deleteGoal(goalId, data._id);
    } catch (e) {
    }
  }

  return (
    <div className="check-item">
      <Checkbox
        label={data.title} />
      <div className="option">
        <i
          className="remove icon"
          onClick={handleDelete}></i>
      </div>
    </div>
  );
};

export default CheckItem;