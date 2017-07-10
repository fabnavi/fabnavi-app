import { createAction } from 'redux-actions';

export const FETCHING_PROJECTS = 'FETCHING_PROJECTS';
export const SELECT_PROJECT_MENU = 'SELECT_PROJECT_MENU';
export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';
export const RECEIVE_PROJECT = 'RECEIVE_PROJECT';
export const WILL_UPDATE_PROJECT_LIST = 'WILL_UPDATE_PROJECT_LIST';

export const fetchingProjects = createAction(FETCHING_PROJECTS);
export const selectProjectMenu = createAction(SELECT_PROJECT_MENU);
export const receiveProjects = createAction(RECEIVE_PROJECTS);
export const receiveProject = createAction(RECEIVE_PROJECT);
export const willUpdateProjectList = createAction(WILL_UPDATE_PROJECT_LIST);

/* function each component mapDispatchToProps */

// In ProjectMenu.jsx
export function selectMenuAction(projectId, mode) {
    return {
        type: selectProjectMenu,
        targetProject: projectId,
        mode: mode
    }
}
