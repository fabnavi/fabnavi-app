import Debug from 'debug';
const debug = Debug('fabnavi:reducer');
const InitialState = 'NOBODY';

export default function userReducer(state = InitialState, action) {
  switch(action.type) {
    case 'LOGGED_IN':
      return action.payload;
    default:
      return state;
  }
}
