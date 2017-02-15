import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import Request, { requize, pend, fulfill, reject } from 'utils/requestStatus';

import * as service from 'services/post';

/* actions */
const RESET_POST = 'post/RESET_POST';
const WRITE_POST = requize('post/WRITE_POST');
const GET_POSTS = requize('post/GET_POSTS');
const DELETE_POST = requize('post/DELETE_POST');
const EDIT_POST = requize('/post/EDIT_POST');
const GET_POST = requize('post/GET_POST');
const LIKE_POST = requize('/post/LIKE_POST');
const UNLIKE_POST = requize('/post/UNLIKE_POST');

/* action creators */
export const resetPost = createAction(RESET_POST);

export const writePost = (image, description) => ({
  type: WRITE_POST.DEFAULT,
  payload: {
    promise: service.writePost({ image, description })
  }
});

export const getPosts = (qs) => ({
  type: GET_POSTS.DEFAULT,
  payload: {
    promise: service.getPosts({ qs })
  }
});

export const deletePost = (postId) => ({
  type: DELETE_POST.DEFAULT,
  payload: {
    promise: service.deletePost({ postId })
  }
});

export const editPost = (postId, image, description) => ({
  type: EDIT_POST.DEFAULT,
  payload: {
    promise: service.editPost({ postId, image, description })
  }
});

export const getPost = (postId) => ({
  type: GET_POST.DEFAULT,
  payload: {
    promise: service.getPost({ postId })
  }
});

export const likePost = (postId) => ({
  type: LIKE_POST.DEFAULT,
  payload: {
    promise: service.likePost({ postId })
  }
});

export const unlikePost = (postId) => ({
  type: UNLIKE_POST.DEFAULT,
  payload: {
    promise: service.unlikePost({ postId })
  }
});

/* initialState */
const initialState = Map({
  requests: Map({
    write: Request(),
    getPosts: Request(),
    deletePost: Request(),
    editPost: Request(),
    getPost: Request(),
    likePost: Request(),
    unlikePost: Request()
  }),
  post: List(),
  postDetail: null
});

/* reducer */
export default handleActions({

  // RESET POST
  [RESET_POST]: (state, action) => {
    return state.setIn(['post'], List());
  },

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

  // GET POSTS
  [GET_POSTS.PENDING]: (state, action) => {
    return pend(state, 'getPosts');
  },
  [GET_POSTS.FULFILLED]: (state, action) => {
    const {data} = action.payload;
    const changed = state.set('post', fromJS(data.data));
    return fulfill(changed, 'getPosts');
  },
  [GET_POSTS.REJECTED]: (state, action) => {
    const error = action.payload;
    return reject(state, 'getPosts', error);
  },

  // DELETE POST
  [DELETE_POST.PENDING]: (state, action) => {
    return pend(state, 'deletePost');
  },
  [DELETE_POST.FULFILLED]: (state, action) => {
    const {data} = action.payload;
    const index = state.get('post').findIndex(list => {
      return list._id === data._id
    });
    const changed = state.updateIn(['post'], list => list.delete(index));
    return fulfill(changed, 'deletePost');
  },
  [DELETE_POST.REJECTED]: (state, action) => {
    const error = action.payload;
    return reject(state, 'deletePost', error);
  },

  // EDIT POST
  [EDIT_POST.PENDING]: (state, action) => {
    return pend(state, 'editPost');
  },
  [EDIT_POST.FULFILLED]: (state, action) => {
    // const {data} = action.payload;
    // const index = state.get('post').findIndex(list => {
    //   return list._id === data._id
    // });
    // const changed = state.updateIn(['post'], list => list.delete(index));
    return fulfill(state, 'editPost');
  },
  [EDIT_POST.REJECTED]: (state, action) => {
    const error = action.payload;
    return reject(state, 'editPost', error);
  },

  // GET POST
  [GET_POST.PENDING]: (state, action) => {
    return pend(state, 'getPost');
  },
  [GET_POST.FULFILLED]: (state, action) => {
    const {data} = action.payload;
    const changed = state.set('postDetail', data);
    return fulfill(changed, 'getPost');
  },
  [GET_POST.REJECTED]: (state, action) => {
    const error = action.payload;
    return reject(state, 'getPost', error);
  },

  // LIKE POST
  [LIKE_POST.PENDING]: (state, action) => {
    return pend(state, 'likePost');
  },
  [LIKE_POST.FULFILLED]: (state, action) => {
    const {data} = action.payload;
    const index = state.get('post').findIndex(item =>
      item.get('_id') === data.postId
    );
    const changed = state.updateIn(['post', index, 'post', 'likes'], likes => likes.push(data.username));
    return fulfill(changed, 'likePost');
  },
  [LIKE_POST.REJECTED]: (state, action) => {
    const error = action.payload;
    return reject(state, 'likePost', error);
  },

  // UNLIKE POST
  [UNLIKE_POST.PENDING]: (state, action) => {
    return pend(state, 'unlikePost');
  },
  [UNLIKE_POST.FULFILLED]: (state, action) => {
    const {data} = action.payload;
    const index = state.get('post').findIndex(item =>
      item.get('_id') === data.postId
    );
    const changed = state.updateIn(['post', index, 'post', 'likes'], likes =>
      likes.delete(likes.findIndex(item =>
        item === data.username)
      )
    );
    return fulfill(changed, 'unlikePost');
  },
  [UNLIKE_POST.REJECTED]: (state, action) => {
    const error = action.payload;
    return reject(state, 'unlikePost', error);
  },

}, initialState);