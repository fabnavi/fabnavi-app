import { combineReducers } from 'redux';
import Debug from 'debug';

import player from './player';
import user from './user';
import manager from './manager';
import frame from './frame';
import errors from './errors';

const debug = Debug('fabnavi:reducer');

export default combineReducers({
  player,
  user,
  manager,
  frame,
  errors
});