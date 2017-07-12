import { createAction } from 'redux-actions';

export const FETCHING_PROJECTS = 'FETCHING_PROJECTS';
export const SELECT_PROJECT_MENU = 'SELECT_PROJECT_MENU';
export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';
export const RECEIVE_PROJECT = 'RECEIVE_PROJECT';
export const WILL_UPDATE_PROJECT_LIST = 'WILL_UPDATE_PROJECT_LIST';
export const SELECT_PREV_PAGE = 'SELECT_PREV_PAGE';
export const SELECT_NEXT_PAGE = 'SELECT_NEXT_PAGE';
export const UPDATE_PREV_PAGE = 'UPDATE_PREV_PAGE'
export const UPDATE_NEXT_PAGE = 'UPDATE_NEXT_PAGE';

export const fetchingProjects = createAction(FETCHING_PROJECTS);
export const selectProjectMenu = createAction(SELECT_PROJECT_MENU);
export const receiveProjects = createAction(RECEIVE_PROJECTS);
export const receiveProject = createAction(RECEIVE_PROJECT);
export const willUpdateProjectList = createAction(WILL_UPDATE_PROJECT_LIST);
export const selectPrevPage = createAction(SELECT_PREV_PAGE);
export const selectNextPage = createAction(SELECT_NEXT_PAGE);
export const updatePrevPage = createAction(UPDATE_PREV_PAGE);
export const updateNextPage = createAction(UPDATE_NEXT_PAGE);

/* function each component mapDispatchToProps */

// In ProjectElement.jsx
export function selectMenuAction(projectId, mode) {
    return {
        type: SELECT_PROJECT_MENU,
        targetProject: projectId,
        mode: mode
    }
}

// In PageControl.jsx
export function movePrevPage() {
    return {
        type: SELECT_PREV_PAGE
    }
}

export function moveNextPage() {
    return {
        type: SELECT_NEXT_PAGE
    }
}

// In ProjectList.jsx
export function initializePrevPageState() {
    return {
        type: UPDATE_PREV_PAGE
    }
}

export function initializeNextPageState() {
    return {
        type: UPDATE_NEXT_PAGE
    }
}