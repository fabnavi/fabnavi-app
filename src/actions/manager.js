import { createAction } from 'redux-actions';

export const fetchingProjects = createAction('FETCHING_PROJECTS');
export const selectProject = createAction('SELECT_PROJECT');
export const selectProjectMenu = createAction('SELECT_PROJECT_MENU');
export const fireMenuAction = createAction('FIRE_MENU_ACTION');
export const receiveProjects = createAction('RECEIVE_PROJECTS');
export const receiveProject = createAction('RECEIVE_PROJECT');
export const exitDetail = createAction('EXIT_DETAIL');
export const playerChangePage = createAction('PLAYER_CHANGE_PAGE');
export const updateCalibration = createAction('UPDATE_CALIBRATION');
export const togglePlaying = createAction('TOGGLE_PLAYING');
export const willUpdateProjectList = createAction('WILL_UPDATE_PROJECT_LIST');
export const backHome = createAction('BACK_HOME');
