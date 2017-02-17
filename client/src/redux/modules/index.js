import { combineReducers } from 'redux';

import auth from './auth';
import post from './post';
import profile from './profile';
import follow from './follow';

const reducers = {
  auth,
  post,
  profile,
  follow
}

export default combineReducers(reducers);