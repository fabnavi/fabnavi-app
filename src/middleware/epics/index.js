import { combineEpics, createEpicMiddleware } from 'redux-observable';
import Rx from 'rxjs';
import Debug from 'debug';

import {
    CHANGE_PROJECT_LIST_PAGE,
    FETCHING_PROJECTS,
    FETCH_PROJECTS,
    fetchingProjects,
    fetchProjects,
    receiveProjects
} from '../../actions/manager';

const debug = Debug('fabnavi:epics');

const signIn = action$ => {
    return action$.ofType('SIGN_IN')
        .do(action => {
            debug('Sign in', action)
        })
        .ignoreElements();
}

const changedProjectListPageHookEpic = (action$, store) => 
  action$.ofType(CHANGE_PROJECT_LIST_PAGE)
    .filter(action => {
      const page = action.payload;
      const { projects, perPage } = store.getState().manager; 
      return  projects.slice(page * perPage, (page + 1) * perPage).length === 0;
    })
    .map(action => fetchProjects(action.payload, 'all'))
;

const fetchProjectsEpic = (action$, store) => 
  action$.ofType(FETCH_PROJECTS)
  .do(_ => store.dispatch(fetchingProjects()))
  .switchMap(action => {
    debug(action);
    const {mode, page} = action.payload;
    let fetch;
    if (mode === "all") {
      fetch = api.fetchAllProjects;
    } else {
      fetch = api.fetchOwnProjects;
    }
    return Rx.Observable.fromPromise(fetch(page))
      .map(response => {return {...response, page}});
  })
  .map(response => receiveProjects(response))
;

export default createEpicMiddleware(combineEpics(
    signIn,
    fetchProjectsEpic,
    changedProjectListPageHookEpic
));
