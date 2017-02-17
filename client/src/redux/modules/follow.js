import { handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import Request, { requize, pend, fulfill, reject } from 'utils/requestStatus';

import * as service from 'services/follow';

/* actions */
const FOLLOW = requize('follow/FOLLOW');
const UNFOLLOW = requize('follow/UNFOLLOW');
const GET_FOLLOWEE = requize('follow/GET_FOLLOWEE');
const GET_FOLLOWER = requize('follow/GET_FOLLOWER');

/* action creators */
export const follow = (username) => ({
  type: FOLLOW.DEFAULT,
  payload: {
    promise: service.follow({ username })
  }
});

export const unfollow = (username) => ({
  type: UNFOLLOW.DEFAULT,
  payload: {
    promise: service.unfollow({ username })
  }
});

export const getFollowee = (username) => ({
  type: GET_FOLLOWEE.DEFAULT,
  payload: {
    promise: service.getFollowee({ username })
  }
});

export const getFollower = (username) => ({
  type: GET_FOLLOWER.DEFAULT,
  payload: {
    promise: service.getFollower({ username })
  }
});

/* initialState */
const initialState = Map({
  requests: Map({
    follow: Request(),
    unfollow: Request(),
    getFollowee: Request(),
    getFollower: Request()
  }),
  followee: List(),
  follower: List()
});

/* reducer */
export default handleActions({

  // FOLLOW
  [FOLLOW.PENDING]: (state, action) => {
    return pend(state, 'follow');
  },
  [FOLLOW.FULFILLED]: (state, action) => {
    const {data} = action.payload;
    const changed = state.updateIn(['followee'], list => list.push(data.data));
    return fulfill(changed, 'follow');
  },
  [FOLLOW.REJECTED]: (state, action) => {
    const error = action.payload;
    return reject(state, 'follow', error);
  },

  // UNFOLLOW
  [UNFOLLOW.PENDING]: (state, action) => {
    return pend(state, 'unfollow');
  },
  [UNFOLLOW.FULFILLED]: (state, action) => {
    const {data} = action.payload;
    return fulfill(state, 'unfollow');
  },
  [UNFOLLOW.REJECTED]: (state, action) => {
    const error = action.payload;
    return reject(state, 'unfollow', error);
  },

  // GET FOLLOWEE
  [GET_FOLLOWEE.PENDING]: (state, action) => {
    return pend(state, 'getFollowee');
  },
  [GET_FOLLOWEE.FULFILLED]: (state, action) => {
    const {data} = action.payload;
    const changed = state.set('followee', fromJS(data.data));
    return fulfill(changed, 'getFollowee');
  },
  [GET_FOLLOWEE.REJECTED]: (state, action) => {
    const error = action.payload;
    return reject(state, 'getFollowee', error);
  },

  // GET FOLLOWER
  [GET_FOLLOWER.PENDING]: (state, action) => {
    return pend(state, 'getFollower');
  },
  [GET_FOLLOWER.FULFILLED]: (state, action) => {
    const {data} = action.payload;
    const changed = state.set('follower', fromJS(data.data));
    return fulfill(changed, 'getFollower');
  },
  [GET_FOLLOWER.REJECTED]: (state, action) => {
    const error = action.payload;
    return reject(state, 'getFollower', error);
  }

}, initialState);