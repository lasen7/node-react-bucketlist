import { handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import Request, { requize, pend, fulfill, reject } from 'utils/requestStatus';

import * as service from 'services/goal';

/* actions */
const WRITE_GOAL = requize('goal/WRITE_GOAL');
const GET_GOAL = requize('goal/GET_GOAL');
const DELETE_GOAL = requize('goal/DELETE_GOAL');

/* action creators */
export const writeGoal = (title) => ({
  type: WRITE_GOAL.DEFAULT,
  payload: {
    promise: service.writeGoal({ title })
  }
});

export const getGoal = (username) => ({
  type: GET_GOAL.DEFAULT,
  payload: {
    promise: service.getGoal({ username })
  }
});

export const deleteGoal = (goalId, goalsId) => ({
  type: DELETE_GOAL.DEFAULT,
  payload: {
    promise: service.deleteGoal({ goalId, goalsId })
  }
});

/* initialState */
const initialState = Map({
  requests: Map({
    writeGoal: Request(),
    getGoal: Request(),
    deleteGoal: Request()
  }),
  goal: List(),
  goalId: ''
});

/* reducer */
export default handleActions({

  // WRITE GOAL
  [WRITE_GOAL.PENDING]: (state, action) => {
    return pend(state, 'writeGoal');
  },
  [WRITE_GOAL.FULFILLED]: (state, action) => {
    const {data} = action.payload;
    return fulfill(state, 'writeGoal');
  },
  [WRITE_GOAL.REJECTED]: (state, action) => {
    const error = action.payload;
    return reject(state, 'writeGoal', error);
  },

  // GET GOAL
  [GET_GOAL.PENDING]: (state, action) => {
    return pend(state, 'getGoal');
  },
  [GET_GOAL.FULFILLED]: (state, action) => {
    const {data} = action.payload;
    let changed = state.set('goalId', data.goalId);
    changed = changed.set('goal', fromJS(data.data));
    return fulfill(changed, 'getGoal');
  },
  [GET_GOAL.REJECTED]: (state, action) => {
    const error = action.payload;
    return reject(state, 'getGoal', error);
  },

  // GET GOAL
  [DELETE_GOAL.PENDING]: (state, action) => {
    return pend(state, 'deleteGoal');
  },
  [DELETE_GOAL.FULFILLED]: (state, action) => {
    const {data} = action.payload;
    const changed = state.updateIn(['goal'], list =>
      list.delete(list.findIndex(item =>
        item._id === data.goalsId)
      )
    );
    return fulfill(changed, 'deleteGoal');
  },
  [DELETE_GOAL.REJECTED]: (state, action) => {
    const error = action.payload;
    return reject(state, 'deleteGoal', error);
  },

}, initialState);