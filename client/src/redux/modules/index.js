import { combineReducers } from 'redux';

import auth from './auth';
import post from './post';
import profile from './profile';

const reducers = {
  auth,
  post,
  profile
}

export default combineReducers(reducers);