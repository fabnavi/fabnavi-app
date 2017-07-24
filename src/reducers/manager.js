import { handleActions } from 'redux-actions';
import Debug from 'debug';

import { CHANGE_PROJECT_LIST_PAGE } from '../actions/manager';
const debug = Debug('fabnavi:reducer:manager');

const initialState = {
    projects: {
        byId: {},
        allProjectIds: []
    },
    filter: 'all' | 'own',
    isFetching: false,
    targetProject: null,
    mode: 'home',
    currentPage: 0,
    maxPage: 3,
    canUpdatePage: false
}

export default handleActions({
    [CHANGE_PROJECT_LIST_PAGE]: (state, action) => {
        return {
            ...state,
            currentPage: action.payload
        };
    },
    '@@router/LOCATION_CHANGE': (state, action) => {
        if(action.payload.pathname === '/') {
            return {
                ...state,
                targetProject: null,
                mode: 'home'
            };
        } else if(!action.payload.pathname.match('delete')) {
            return {
                ...state,
                mode: action.payload.pathname.split('/')[1]
            };
        }
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
        debug('receive projects', action)
        const{ page, data } = action.payload;
        const projects = state.projects.concat();
        projects.splice(page * 8, data.length, ...data);
        return Object.assign({}, state, {
            projects: Object.assign({}, state, {
                byId: data.reduce((_projects, project) => {
                    _projects[project.id] = project;
                    return _projects;
                }, {}),
                allProjectIds: data.map(project => project.id)
            }),
            canUpdatePage: false,
            isFetching: false
        });
    },
    RECEIVE_OWN_PROJECTS: (state, action) => {
        debug('receive own projects state', state);
        debug('receive own projects action', action);
        const data = action.payload.data;
        return Object.assign({}, state, {
            projects: data,
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
            projects: action.projects,
            canUpdatePage: false,
            isFetching: false
        })
    }
}, initialState);
