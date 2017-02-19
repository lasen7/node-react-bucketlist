import { handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import Request, { requize, pend, fulfill, reject } from 'utils/requestStatus';

import * as service from 'services/bookmark';

/* actions */
const ADD_BOOKMARK = requize('bookmark/ADD_BOOKMARK');
const DELETE_BOOKMARK = requize('bookmark/DELETE_BOOKMARK');

/* action creators */
export const addBookmark = (postId) => ({
  type: ADD_BOOKMARK.DEFAULT,
  payload: {
    promise: service.addBookmark({ postId })
  }
});

export const deleteBookmark = (postId) => ({
  type: DELETE_BOOKMARK.DEFAULT,
  payload: {
    promise: service.deleteBookmark({ postId })
  }
});

/* initialState */
const initialState = Map({
  requests: Map({
    addBookmark: Request(),
    deleteBookmark: Request()
  }),
  bookmark: List()
});

/* reducer */
export default handleActions({

  // ADD BOOKMARK
  [ADD_BOOKMARK.PENDING]: (state, action) => {
    return pend(state, 'addBookmark');
  },
  [ADD_BOOKMARK.FULFILLED]: (state, action) => {
    const {data} = action.payload;
    return fulfill(state, 'addBookmark');
  },
  [ADD_BOOKMARK.REJECTED]: (state, action) => {
    const error = action.payload;
    return reject(state, 'addBookmark', error);
  },

}, initialState);