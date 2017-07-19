import { handleActions } from 'redux-actions';
import Debug from 'debug';

import { CHANGE_PROJECT_LIST_PAGE } from '../actions/manager';
const debug = Debug('fabnavi:reducer:manager');

const initialState = {
    projects: [],
    isFetching: false,
    targetProject: null,
    mode: 'home',
    currentPage: 0,
    maxPage: 3,
    canUpdatePage: false
};

export default handleActions({
    [CHANGE_PROJECT_LIST_PAGE]: (state, action) => {
        return {
            ...state,
            currentPage: action.payload
        };
    },
    '@@router/LOCATION_CHANGE': (state, action) => {
        if(action.payload.pathname.match('/')) {
            return Object.assign({}, state, {
                targetProject: null,
                mode: 'home'
            });
        } else if(action.payload.pathname.match('detail')) {
            return Object.assign({}, state, {
                targetProject: state.targetProject,
                mode: 'detail'
            })
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
            mode: action.mode
        });
    },
    RECEIVE_PROJECTS: (state, action) => {
        debug('receive projects', action)
        const{ page, data } = action.payload;
        const projects = state.projects.concat();
        projects.splice(page * 8, data.length, ...data);
        return Object.assign({}, state, {
            projects,
            canUpdatePage: false,
            isFetching: false
        });
    },
    RECEIVE_PROJECT: (state, action) => {
        debug('Receive project: ', action);
        return Object.assign({}, state, {
            targetProject: action.targetProject,
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
