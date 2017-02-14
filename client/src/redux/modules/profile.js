import { handleActions } from 'redux-actions';
import { Map } from 'immutable';
import Request, { requize, pend, fulfill, reject } from 'utils/requestStatus';

import * as service from 'services/profile';

/* actions */
const GET_PROFILE = requize('profile/GET_PROFILE');

/* action creators */
export const getProfile = (username) => ({
  type: GET_PROFILE.DEFAULT,
  payload: {
    promise: service.getProfile({ username })
  }
});

/* initialState */

const initialState = Map({
  requests: Map({
    getProfile: Request(),
  }),
  profile: Map({
    thumbnail: 'none',
    username: null,
    fullname: null,
    count: {
      post: 0,
      follower: 0,
      followee: 0,
      bookmark: 0,
      goal: {
        total: 0,
        done: 0
      }
    }
  })
});

/* reducer */

export default handleActions({

  // GET PROFILE
  [GET_PROFILE.PENDING]: (state, action) => {
    return pend(state, 'getProfile');
  },
  [GET_PROFILE.FULFILLED]: (state, action) => {
    const {data} = action.payload;
    const changed = state.mergeIn(['profile'], data);
    return fulfill(changed, 'getProfile');
  },
  [GET_PROFILE.REJECTED]: (state, action) => {
    const error = action.payload;
    return reject(state, 'getProfile', error);
  }

}, initialState);