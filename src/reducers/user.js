import Debug from 'debug';

import Act from "../actions/Types";

const debug = Debug('fabnavi:reducer:user');

const initialState = {
  isLoggedIn: false,
  credential: {
    accessToken: '',
    client: '',
    uid: '',
  },
  id: ''
};

export default function userReducer(state = initialState, action) {
  switch(action.type) {
    case Act.SIGNED_IN:
      debug(action);
      return Object.assign({}, state, {
        isLoggedIn: true,
        credential: action.payload.credential,
        id: action.payload['id'] ? action.payload.id : ''
      });
    case Act.SIGNED_OUT:
      return initialState;
    default:
      return state;
  }
}
