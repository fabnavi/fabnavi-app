import { handleActions } from 'redux-actions';
import Debug from 'debug';

const debug = Debug('fabnavi:reducer:manager');

const initialState = {
    projects: [],
    targetProject: null,
    mode: 'home',
    currentPage: 1,
    canUpdatePage: false
};

export default handleActions({
    FETCHING_PROJECTS: (state, action) => {
        return Object.assign({}, state, {
            isFetching: true
        });
    },
    SELECT_PROJECT_MENU: (state, action) => {
        return Object.assign({}, state, {
            mode: action.mode
        });
    },
    RECEIVE_PROJECTS: (state, action) => {
        return Object.assign({}, state, {
            projects: action.projects,
            canUpdatePage: false,
            isFetchgin: false
        });
    },
    WILL_UPDATE_PROJECT_LIST: (state, action) => {
        debug('Receive Top Project');
        return Object.assign({}, state, {
            canUpdatePage: true
        });
    },
    BACK_HOME: (state, action) => {
        debug('back home');
        return Object.assign({}, state, {
            mode: 'home'
        });
    }
}, initialState);
