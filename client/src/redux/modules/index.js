import { combineReducers } from 'redux';

import auth from './auth';
import post from './post';
import profile from './profile';
import follow from './follow';
import goal from './goal';
import bookmark from './bookmark';

const reducers = {
  auth,
  post,
  profile,
  follow,
  goal,
  bookmark
}

export default combineReducers(reducers);