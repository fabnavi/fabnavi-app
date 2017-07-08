import { createAction } from 'redux-actions';

export const FETCHING_PROJECTS = 'FETCHING_PROJECTS';
export const SELECT_PROJECT = 'SELECT_PROJECT';
export const SELECT_PROJECT_MENU = 'SELECT_PROJECT_MENU';
export const FIRE_MENU_ACTION = 'FIRE_MENU_ACTION';
export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';
export const RECEIVE_PROJECT = 'RECEIVE_PROJECT';
export const EXIT_DETAIL = 'EXIT_DETAIL';
export const WILL_UPDATE_PROJECT_LIST = 'WILL_UPDATE_PROJECT_LIST';
export const BACK_HOME = 'BACK_HOME';

export const fetchingProjects = createAction(FETCHING_PROJECTS);
export const selectProject = createAction(SELECT_PROJECT);
export const selectProjectMenu = createAction(SELECT_PROJECT_MENU);
export const fireMenuAction = createAction(FIRE_MENU_ACTION);
export const receiveProjects = createAction(RECEIVE_PROJECTS);
export const receiveProject = createAction(RECEIVE_PROJECT);
export const exitDetail = createAction(EXIT_DETAIL);
export const willUpdateProjectList = createAction(WILL_UPDATE_PROJECT_LIST);
export const backHome = createAction(BACK_HOME);
