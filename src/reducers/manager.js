import Debug from 'debug';

import Act from "../actions/Types";

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
  }
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
        isFetching: false
      });
    case Act.RECEIVE_PROJECT:
      debug('Receive project: ', action);
      return Object.assign({}, state, {
        project: action.project,
      });
    default:
      return state;
  }
}
