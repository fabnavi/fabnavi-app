import { handleActions } from 'redux-actions';
import Debug from 'debug';

const debug = Debug('fabnavi:reducer:manager');

const initialState = {
    projects: [],
    isFetching: false,
    targetProject: null,
    mode: 'home',
    currentPage: 1,
    canUpdatePage: false
};

export default handleActions({
    '@@router/LOCATION_CHANGE': (state, action) => {
        if(action.payload.pathname === '/') {
            debug('match /', action);
            return Object.assign({}, state, {
                targetProject: null,
                mode: 'home'
            });
        } else if(action.payload.pathname.match('detail')) {
            return Object.assign({}, state, {
                targetProject: state.targetProject,
                mode: 'detail'
            });
        } else if(action.payload.pathname.match('edit')) {
            return Object.assign({}, state, {
                targetProject: state.targetProject,
                mode: 'edit'
            });
        } else if(action.payload.pathname.match('play')) {
            return Object.assign({}, state, {
                targetProject: state.targetProject,
                mode: 'play'
            });
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
    RECEIVE_PROJECTS: (state, action) => {
        debug('receive projects')
        return Object.assign({}, state, {
            projects: action.projects,
            canUpdatePage: false,
            isFetching: false
        });
    },
    WILL_UPDATE_PROJECT_LIST: (state, action) => {
        debug('Receive Top Project');
        return Object.assign({}, state, {
            canUpdatePage: true
        });
    }
}, initialState);
