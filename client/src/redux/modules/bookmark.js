import { handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import Request, { requize, pend, fulfill, reject } from 'utils/requestStatus';

import * as service from 'services/bookmark';

/* actions */
const ADD_BOOKMARK = requize('bookmark/ADD_BOOKMARK');
const DELETE_BOOKMARK = requize('bookmark/DELETE_BOOKMARK');
const GET_BOOKMARK = requize('bookmark/GET_BOOKMARK');

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

export const getBookmark = (username) => ({
  type: GET_BOOKMARK.DEFAULT,
  payload: {
    promise: service.getBookmark({ username })
  }
});

/* initialState */
const initialState = Map({
  requests: Map({
    addBookmark: Request(),
    deleteBookmark: Request(),
    getBookmark: Request()
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

  // DELETE BOOKMARK
  [DELETE_BOOKMARK.PENDING]: (state, action) => {
    return pend(state, 'deleteBookmark');
  },
  [DELETE_BOOKMARK.FULFILLED]: (state, action) => {
    const {data} = action.payload;
    return fulfill(state, 'deleteBookmark');
  },
  [DELETE_BOOKMARK.REJECTED]: (state, action) => {
    const error = action.payload;
    return reject(state, 'deleteBookmark', error);
  },

  // GET BOOKMARK
  [GET_BOOKMARK.PENDING]: (state, action) => {
    return pend(state, 'getBookmark');
  },
  [GET_BOOKMARK.FULFILLED]: (state, action) => {
    const {data} = action.payload;
    const changed = state.set('bookmark', fromJS(data.data));
    return fulfill(changed, 'getBookmark');
  },
  [GET_BOOKMARK.REJECTED]: (state, action) => {
    const error = action.payload;
    return reject(state, 'getBookmark', error);
  },

}, initialState);