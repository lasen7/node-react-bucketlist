import ActionTypes from './ActionTypes';

import * as service from 'services/user';

export const getUsers = () => {
  return {
    type: ActionTypes.GET_USERS,
    payload: {
      promise: service.getUsers()
    }
  }
};