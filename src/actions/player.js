import { createAction } from 'redux-actions';

export const playerChangePage = createAction('PLAYER_CHANGE_PAGE');
export const updateCalibration = createAction('UPDATE_CALIBRATION');
export const togglePlaying = createAction('TOGGLE_PLAYING');
export const playerExit = createAction('PLAYER_EXIT');
export const playerChangeMode = createAction('PLAYER_CHANGE_MODE');