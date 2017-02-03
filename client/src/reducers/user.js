import ActionTypes from 'actions/ActionTypes';
import * as rs from 'utils/requestStatus';

const users = {
  data: []
};

const initialState = {
  users: {
    ...users
  },
  requests: {
    users: {
      ...rs.request
    }
  }
};

export default function user(state = initialState, action) {
  const payload = action.payload;

  switch (action.type) {
    case ActionTypes.GET_USERS + '_PENDING':
      return {
        ...state,
        requests: {
          ...state.requests,
          users: {
            ...rs.pending
          }
        }
      }
    case ActionTypes.GET_USERS + '_FULFILLED':
      return {
        ...state,
        users: {
          ...state.users,
          data: payload.data
        },
        requests: {
          ...state.requests,
          users: {
            ...rs.fulfilled
          }
        }
      }
    case ActionTypes.GET_USERS + '_REJECTED':
      return {
        ...state,
        requests: {
          ...state.requests,
          users: {
            ...rs.rejected,
            error: payload.data.error
          }
        }
      }
    default:
      return state;
  }
}