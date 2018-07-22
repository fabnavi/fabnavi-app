import { handleActions } from 'redux-actions';
import Debug from 'debug';

import {
    CHANGE_PROJECT_LIST_PAGE,
    REQUEST_SEARCH_PROJECTS,
    RECEIVE_SEARCHING_PROJECTS_RESULT,
    RECEIVE_RELOADED_PROJECTS_RESULT
} from '../actions/manager';

const debug = Debug('fabnavi:reducer:manager');

const initialState = {
    projects: {
        byId: {},
        allIds: [],
    },
    // what projects should be shown, all | myOwn
    filter: 'all',
    isFetching: false,
    targetProject: null,
    mode: 'home',
    currentPage: 0,
    maxPage: 3,
    canUpdatePage: false,
    searchQuery: ''
};

const updateProjects = (projects, data) => {
    const byId = {
        ...projects.byId,
        ...data.reduce((prev, project) => {
            prev[project.id] = project; return prev;
        }, {})
    };
    return {
        byId,
        allIds: Object.keys(byId).sort((a, b) => {
            return Date.parse(byId[a].updated_at) < Date.parse(byId[b].updated_at) ? 1 : -1;
        }).map(key => Number(key))
    };
};
export default handleActions({
    [CHANGE_PROJECT_LIST_PAGE]: (state, action) => {
        return {
            ...state,
            currentPage: action.payload
        };
    },
    '@@router/LOCATION_CHANGE': (state, action) => {
        let{ currentPage, filter, targetProject, mode } = state;
        const pathname = action.payload.pathname;
        if(pathname === '/') {
            targetProject = null;
            mode = 'home';
            filter = 'all';
        } else if(!pathname.match('delete')) {
            mode = pathname.split('/')[1];
            if(pathname === '/myprojects') {
                filter = 'myOwn';
                currentPage = 0;
            }
        }
        return {
            ...state, targetProject, filter, mode, currentPage
        };
    },
    FETCHING_PROJECTS: (state, action) => {
        debug('fetcing projects')
        return Object.assign({}, state, {
            isFetching: true
        });
    },
    SELECT_PROJECT_MENU: (state, action) => {
        debug('select project menu')
        return Object.assign({}, state, {
            targetProject: action.targetProject,
            mode: action.mode
        });
    },
    RECEIVE_PROJECT: (state, action) => {
        debug('receive project', action);
        return {
            ...state,
            targetProject: action.payload
        }
    },
    RECEIVE_PROJECTS: (state, action) => {
        const{ data } = action.payload;
        return Object.assign({}, state, {
            projects: updateProjects(state.projects, data),
            canUpdatePage: false,
            isFetching: false
        });
    },
    WILL_UPDATE_PROJECT_LIST: (state, action) => {
        debug('Receive Top Project');
        return Object.assign({}, state, {
            canUpdatePage: true
        });
    },
    UPDATE_PROJECTS: (state, action) => {
        debug('update projects');
        return Object.assign({}, state, {
            projects: updateProjects(state.projects, action.projects),
            canUpdatePage: false,
            isFetching: false
        })
    },
    [RECEIVE_SEARCHING_PROJECTS_RESULT]: (state, action) => {
        const{ data } = action.payload;
        return Object.assign({}, state, {
            currentPage: 0,
            projects: updateProjects(data, data),
            isFetching: false
        })
    },
    [REQUEST_SEARCH_PROJECTS]: (state, action) => {
        const{ keyword } = action.payload;
        return Object.assign({}, state, {
            searchQuery: keyword
        });
    },
    [RECEIVE_RELOADED_PROJECTS_RESULT]: (state, action) => {
        const{ data } = action.payload;
        return Object.assign({}, state, {
            projects: updateProjects(data, data),
            isFetching: false
        })
    },
}, initialState);
