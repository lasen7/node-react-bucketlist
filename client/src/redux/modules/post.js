import { handleActions } from 'redux-actions';
import { Map } from 'immutable';
import Request, { requize, pend, fulfill, reject } from 'utils/requestStatus';

import * as service from 'services/post';

/* actions */
const WRITE_POST = requize('post/WRITE_POST');

/* action creators */
export const writePost = (image, description) => ({
  type: WRITE_POST.DEFAULT,
  payload: {
    promise: service.writePost({ image, description })
  }
});

/* initialState */
const initialState = Map({
  requests: Map({
    write: Request()
  })
});

/* reducer */
export default handleActions({

  // WRITE POST
  [WRITE_POST.PENDING]: (state, action) => {
    return pend(state, 'write');
  },
  [WRITE_POST.FULFILLED]: (state, action) => {
    return fulfill(state, 'write');
  },
  [WRITE_POST.REJECTED]: (state, action) => {
    const error = action.payload;
    return reject(state, 'write', error);
  },

}, initialState);