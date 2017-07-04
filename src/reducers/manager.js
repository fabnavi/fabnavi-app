import Debug from 'debug';

import Act from '../actions/Types';

const debug = Debug('fabnavi:reducer:manager');

const MenuActions = [
    'play', 'detail', 'edit', 'delete'
];

const initialState = {
    projects: [],
    project: null,
    isFetching: false,
    mode: 'allProjects',
    selector: {
        page: 0,
        index: 0,
        row: 0,
        col: 0,
        openMenu: false,
        menuIndex: 0,
        action: null
    },
    shouldUpdate: false,
    prevPage: false,
    nextPage: false,
    initialPage: 1,
    currentPage: 1,
    perPage: 8
}

export default function managerReducer(state = initialState, action) {

    switch(action.type) {
        case Act.FETCHING_PROJECTS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case Act.SELECT_PROJECT:
            return Object.assign({}, state, {
                project: state.projects[action.selector.index],
                selector: action.selector
            });
        case Act.SELECT_PROJECT_MENU:
            return Object.assign({}, state, {
                selector: Object.assign({}, action.selector, {
                    action: MenuActions[state.selector.menuIndex]
                })
            });
        case Act.FIRE_MENU_ACTION:
            return Object.assign({}, state, {
                selector: action.selector
            });
        case Act.RECEIVE_PROJECTS:
            return Object.assign({}, state, {
                projects: action.projects,
                project: action.projects[state.selector.index],
                isFetching: false,
                shouldUpdate: false
            });
        case Act.RECEIVE_PROJECT:
            debug('Receive project: ', action);
            return Object.assign({}, state, {
                project: action.project,
            });
        case Act.WILL_UPDATE_PROJECT_LIST:
            debug('Receive Top Project');
            return Object.assign({}, state, {
                shouldUpdate: true
            });
        case Act.MOVE_PREV_PAGE:
            debug('Move Preview Page');
            return Object.assign({}, state, {
                prevPage: true,
                currentPage: state.currentPage - 1
            });
        case Act.MOVE_NEXT_PAGE:
            debug('Move Next Page');
            return Object.assign({}, state, {
                nextPage: true,
                currentPage: state.currentPage + 1
            });
        case Act.PREV_PROJECTS_PAGE:
            debug('Prev Projects Page');
            return Object.assign({}, state, {
                prevPage: false
            });
        case Act.NEXT_PROJECTS_PAGE:
            debug('Next Projects Page');
            return Object.assign({}, state, {
                nextPage: false
            });
        default:
            return state;
    }
}
