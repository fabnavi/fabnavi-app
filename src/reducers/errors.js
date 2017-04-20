import Debug from 'debug';

const debug = Debug('fabnavi:reducer:errors');

const initialState = [];

export default function userReducer(state = initialState, action) {
  if(action.type.includes('FAILED')) {
    debug(state, action);

    return state.concat({
      message: action.message,
      error: action.error,
      time: action.time
    });

  }
  return state;
}
