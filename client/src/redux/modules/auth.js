import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import Request, { requize, pend, fulfill, reject } from 'utils/requestStatus';

import * as service from 'services/auth';

/* actions */
const SIGNUP = requize('auth/SIGNUP');
const SIGNIN = requize('auth/SIGNIN');
const GET_INFO = requize('auth/GET_INFO');
const SIGNUP_OAUTH = requize('auth/SIGNUP_OAUTH');

/* action creators */
export const signup = (email, fullname, username, password, gender) => ({
  type: SIGNUP.DEFAULT,
  payload: {
    promise: service.signup({ email, fullname, username, password, gender })
  }
});

export const signupOauth = (username) => ({
  type: SIGNUP_OAUTH.DEFAULT,
  payload: {
    promise: service.signupOauth({ username })
  }
});

export const signin = (username, password) => ({
  type: SIGNIN.DEFAULT,
  payload: {
    promise: service.signin({ username, password })
  }
});

export const getInfo = () => ({
  type: GET_INFO.DEFAULT,
  payload: {
    promise: service.getInfo()
  }
});

/* initialState */

const initialState = Map({
  requests: Map({
    signup: Request(),
    signin: Request(),
    getInfo: Request()
  }),
  session: Map({
    _id: null,
    type: null,
    common_profile: {
      thumbnail: 'none',
      username: null,
      fullname: null,
      gender: null,
      email: null
    }
  })
});

/* reducer */

export default handleActions({

  // SIGNUP
  [SIGNUP.PENDING]: (state, action) => {
    return pend(state, 'signup');
  },
  [SIGNUP.FULFILLED]: (state, action) => {
    return fulfill(state, 'signup');
  },
  [SIGNUP.REJECTED]: (state, action) => {
    const error = action.payload;
    return reject(state, 'signup', error);
  },

  // SIGNUP OAUTH
  [SIGNUP_OAUTH.PENDING]: (state, action) => {
    return pend(state, 'signup');
  },
  [SIGNUP_OAUTH.FULFILLED]: (state, action) => {
    return fulfill(state, 'signup');
  },
  [SIGNUP_OAUTH.REJECTED]: (state, action) => {
    const error = action.payload;
    return reject(state, 'signup', error);
  },

  // SIGNIN
  [SIGNIN.PENDING]: (state, action) => {
    return pend(state, 'signin');
  },
  [SIGNIN.FULFILLED]: (state, action) => {
    const {data} = action.payload;
    const changed = state.mergeIn(['session'], data);
    return fulfill(changed, 'signin');
  },
  [SIGNIN.REJECTED]: (state, action) => {
    const error = action.payload;
    return reject(state, 'signin', error);
  },

  // SIGNIN
  [GET_INFO.PENDING]: (state, action) => {
    return pend(state, 'getInfo');
  },
  [GET_INFO.FULFILLED]: (state, action) => {
    const {data} = action.payload;
    const changed = state.mergeIn(['session'], data.user);
    return fulfill(changed, 'getInfo');
  },
  [GET_INFO.REJECTED]: (state, action) => {
    const error = action.payload;
    return reject(state, 'getInfo', error);
  }
}, initialState);