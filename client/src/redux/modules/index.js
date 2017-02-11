import { combineReducers } from 'redux';

import auth from './auth';
import post from './post';

const reducers = {
  auth,
  post
}

export default combineReducers(reducers);