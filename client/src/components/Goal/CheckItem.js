import React from 'react';
import { Checkbox } from 'semantic-ui-react'

const CheckItem = ({goalId, data, GoalActions }) => {

  const handleDelete = async () => {
    console.log('goalId: ', goalId);
    console.log('data: ', data);

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
        <i className="write icon"></i>
        <i
          className="remove icon"
          onClick={handleDelete}></i>
      </div>
    </div>
  );
};

export default CheckItem;