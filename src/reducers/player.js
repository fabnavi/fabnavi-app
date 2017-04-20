import Debug from 'debug';

import Act from "../actions/Types";

const debug = Debug('fabnavi:reducer:player');

const PlayerModes = [
  'play', 'calibrateCenter', 'calibrateScale'
];

const initialState = {
  mode: 'play',
  contentType: 'photo',
  page: 0,
  project: null,
  currentTime: 0,
  isPlaying: false,
  config: {
    x: 0,
    y: 0,
    w: 1000,
    h: 1000
  }
}

export default function playerReducer(state = initialState, action) {

  switch(action.type) {
    case Act.PLAYER_CHANGE_PAGE:
      return Object.assign({}, state, {
        page: action.page,
      });
    case Act.RECEIVE_PROJECT:
      debug('Receive project: ', action);
      return Object.assign({}, state, {
        project: action.project,
      });
    case Act.UPDATE_CALIBRATION:
      return Object.assign({}, state, {
        config: action.config
      });
    case Act.PLAYER_EXIT:
      debug("player exit, nothing to do");
      return initialState;
    case Act.PLAYER_CHANGE_MODE:
      return Object.assign({}, state, {
        mode: nextMode(state)
      });
    case Act.TOGGLE_PLAYING:
      if(state.contentType === 'movie') {
        return Object.assign({}, state, {
          isPlaying: !state.isPlaying
        });
      }
      return state;
    default:
      return state;
  }
}


function nextMode(state) {
  let index = PlayerModes.indexOf(state.mode) + 1;
  if(index >= PlayerModes.length) {
    index = 0;
  }
  return PlayerModes[index];
}
