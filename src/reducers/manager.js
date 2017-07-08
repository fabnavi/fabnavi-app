import Debug from 'debug';

import Act from '../actions/Types';

const debug = Debug('fabnavi:reducer:manager');

const initialState = {
    projects: [],
    targetProject: null,
    mode: 'home',
    currentPage: 1,
    canUpdatePage: false
};

export default function managerReducer(state = initialState, action) {

    switch(action.type) {
        case Act.SELECT_PROJECT_MENU:
            return Object.assign({}, state, {
                mode: action.mode
            });
        case Act.RECEIVE_PROJECTS:
            return Object.assign({}, state, {
                projects: action.projects,
                canUpdatePage: false
            });
        case Act.WILL_UPDATE_PROJECT_LIST:
            debug('Receive Top Project');
            return Object.assign({}, state, {
                canUpdatePage: true
            });
        case Act.HOVER_PROJECT:
            debug('mouse hover projects');
            return Object.assign({}, state, {
                targetProject: action.targetProject
            });
        case Act.BACK_HOME:
            debug('back home');
            return Object.assign({}, state, {
                mode: 'home'
            })
        default:
            return state;
    }
}
