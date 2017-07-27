import { createAction } from 'redux-actions';

export const PLAYER_CHANGE_PAGE = 'PLAYER_CHANGE_PAGE';
export const UPDATE_CALIBRATION = 'UPDATE_CALIBRATION';
export const TOGGLE_PLAYING = 'TOGGLE_PLAYING';
export const PLAYER_EXIT = 'PLAYER_EXIT';
export const PLAYER_CHANGE_MODE = 'PLAYER_CHANGE_MODE';

export const playerChangePage = createAction(PLAYER_CHANGE_PAGE);
export const updateCalibration = createAction(UPDATE_CALIBRATION);
export const togglePlaying = createAction(TOGGLE_PLAYING);
export const playerExit = createAction(PLAYER_EXIT);
export const playerChangeMode = createAction(PLAYER_CHANGE_MODE);