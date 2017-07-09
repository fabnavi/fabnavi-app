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
        debug('receive projects')
        return Object.assign({}, state, {
            projects: action.projects,
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
    }
}, initialState);
