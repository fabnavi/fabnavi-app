import { combineEpics, createEpicMiddleware } from 'redux-observable';
import Rx from 'rxjs';
import Debug from 'debug';

import {
    CHANGE_PROJECT_LIST_PAGE,
    FETCHING_PROJECTS,
    FETCH_PROJECTS,
    UPDATE_PROJECT,
    fetchingProjects,
    fetchProjects,
    receiveProject,
    receiveProjects,
    receiveOwnProjects
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
            const{ projects, perPage } = store.getState().manager;
            return projects.slice(page * perPage, (page + 1) * perPage).length === 0;
        })
        .map(action => fetchProjects(action.payload, 'all'))
;

const fetchProjectEpic = (action$) =>
    action$.ofType('@@router/LOCATION_CHANGE')
        .filter(action => action.payload.pathname !== '/' &&
            !action.payload.pathname.match('delete') &&
            !action.payload.pathname.match('help') &&
            !action.payload.pathname.match('myprojects'))
        .switchMap(action => {
            const projectId = action.payload.pathname.match(/\d+/)[0];
            return api.getProject(projectId)
        })
        .map(({ data }) => receiveProject(data))
;

const fetchOwnProjectsEpic = (action$, store) => 
    action$.ofType('@@router/LOCATION_CHANGE')
        .filter(action => action.payload.pathname.match('myprojects'))
        .do(_ => store.dispatch(fetchingProjects()))
        .switchMap(action => {
            debug('action', action);
            return Rx.Observable.fromPromise(api.fetchOwnProjects())
                .map(response => {
                    debug('function promise resulst', response)
                    return { ...response}
                });
        })
        .map(response => receiveOwnProjects(response))
;

const fetchProjectsEpic = (action$, store) =>
    action$.ofType(FETCH_PROJECTS)
        .do(_ => store.dispatch(fetchingProjects()))
        .switchMap(action => {
            debug(action);
            const{ mode, page } = action.payload;
            let fetch;
            if(mode === 'all') {
                fetch = api.fetchAllProjects;
            } else {
                fetch = api.fetchOwnProjects;
            }
            return Rx.Observable.fromPromise(fetch(page))
                .map(response => {
                    return { ...response, page }
                });
        })
        .map(response => {
            debug('response', response);
            receiveProjects(response)
        })
;

const updateProjectEpic = action$ =>
    action$.ofType(UPDATE_PROJECT)
        .do(action =>
            api.updateProject(action.payload)
                .then(res => debug('update success', res))
                .catch(err => debug(err)))
        .ignoreElements()
;

const deleteProjectEpic = action$ =>
    action$.ofType('@@router/LOCATION_CHANGE')
        .filter(action => action.payload.pathname.match('delete'))
        .map((action) => {
            const projectId = action.payload.pathname.match(/\d+/)[0];
            api.deleteProject(projectId)
                .then(() => api.fetchOwnProjects())
                .catch((error) => debug(error));
        }).ignoreElements()
;

export default createEpicMiddleware(combineEpics(
    signIn,
    fetchProjectEpic,
    fetchProjectsEpic,
    updateProjectEpic,
    deleteProjectEpic,
    changedProjectListPageHookEpic,
    fetchOwnProjectsEpic
));
