import { createAction } from 'redux-actions';

export const FETCHING_PROJECTS = 'FETCHING_PROJECTS';
export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const SELECT_PROJECT_MENU = 'SELECT_PROJECT_MENU';
export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';
export const RECEIVE_PROJECT = 'RECEIVE_PROJECT';
export const WILL_UPDATE_PROJECT_LIST = 'WILL_UPDATE_PROJECT_LIST';
export const CHANGE_PROJECT_LIST_PAGE = 'CHANGE_PROJECT_LIST_PAGE';

export const fetchingProjects = createAction(FETCHING_PROJECTS);
export const selectProjectMenu = createAction(SELECT_PROJECT_MENU);
export const receiveProjects = createAction(RECEIVE_PROJECTS);
export const receiveProject = createAction(RECEIVE_PROJECT);
export const willUpdateProjectList = createAction(WILL_UPDATE_PROJECT_LIST);
export const changeProjectListPage = createAction(CHANGE_PROJECT_LIST_PAGE, (page) => {
    return page;
});
export const fetchProjects = createAction(FETCH_PROJECTS, (page, mode)=> {
    return {
        page,
        mode
    }
})

/* function each component mapDispatchToProps */

// In ProjectElement.jsx
export function selectMenuAction(projectId, mode) {
    return {
        type: SELECT_PROJECT_MENU,
        targetProject: projectId,
        mode: mode
    }
}
