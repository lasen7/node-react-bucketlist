import { handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import Request, { requize, pend, fulfill, reject } from 'utils/requestStatus';

import * as service from 'services/goal';

/* actions */
const WRITE_GOAL = requize('goal/WRITE_GOAL');

/* action creators */
export const writeGoal = (title) => ({
  type: WRITE_GOAL.DEFAULT,
  payload: {
    promise: service.writeGoal({ title })
  }
});

/* initialState */
const initialState = Map({
  requests: Map({
    writeGoal: Request()
  })
});

/* reducer */
export default handleActions({

  // WRITE GOAL
  [WRITE_GOAL.PENDING]: (state, action) => {
    return pend(state, 'writeGoal');
  },
  [WRITE_GOAL.FULFILLED]: (state, action) => {
    const {data} = action.payload;
    // const changed = state.updateIn(['followee'], list => list.push(data.data));
    return fulfill(state, 'writeGoal');
  },
  [WRITE_GOAL.REJECTED]: (state, action) => {
    const error = action.payload;
    return reject(state, 'writeGoal', error);
  },

}, initialState);