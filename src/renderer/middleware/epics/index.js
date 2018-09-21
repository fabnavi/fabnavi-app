import { combineEpics, createEpicMiddleware } from 'redux-observable';
import Rx from 'rxjs';
import Debug from 'debug';
import { push } from 'react-router-redux';

import {
    CHANGE_PROJECT_LIST_PAGE,
    FETCHING_PROJECTS,
    FETCH_PROJECTS,
    UPDATE_PROJECT,
    REQUEST_SEARCH_PROJECTS,
    RELOAD_PROJECTS,
    DELETE_PROJECT,
    CONFIRM_DELETE_PROJECT,
    fetchingProjects,
    fetchProjects,
    receiveProject,
    receiveProjects,
    receiveSearchProjectsResult,
    receiveReloadedProjectsResult,
    openDeleteConfirmation,
    closeDeleteConfirmation,
    reloadProjects
} from '../../actions/manager';

const debug = Debug('fabnavi:epics');

const signIn = action$ => {
    return action$
        .ofType('SIGN_IN')
        .do(action => {
            debug('Sign in', action);
        })
        .ignoreElements();
};

const changedProjectListPageHookEpic = (action$, store) =>
    action$.ofType(CHANGE_PROJECT_LIST_PAGE).map(action => fetchProjects(action.payload, 'all'));

const fetchOwnProjectsEpic = action$ =>
    action$
        .ofType('@@router/LOCATION_CHANGE')
        .filter(action => action.payload.pathname === '/myprojects')
        .map(action => fetchProjects(action.payload, 'myOwn'));

const goBackHomeEpic = (action$, store) =>
    action$
        .ofType('@@router/LOCATION_CHANGE')
        .filter(action => action.payload.pathname === '/')
        .do(_ => store.dispatch(fetchingProjects()))
        .switchMap(_ => {
            return api.fetchAllProjects();
        })
        .map(response => receiveProjects(response));

const fetchProjectEpic = action$ =>
    action$
        .ofType('@@router/LOCATION_CHANGE')
        .filter(
            action =>
                action.payload.pathname !== '/' &&
                !action.payload.pathname.match('delete') &&
                !action.payload.pathname.match('help') &&
                !action.payload.pathname.match('myprojects') &&
                !action.payload.pathname.match('workspace')
        )
        .switchMap(action => {
            const projectId = action.payload.pathname.match(/\d+/)[0];
            return api.getProject(projectId);
        })
        .map(({ data }) => receiveProject(data));

const fetchProjectsEpic = (action$, store) =>
    action$
        .ofType(FETCH_PROJECTS)
        .do(_ => store.dispatch(fetchingProjects()))
        .switchMap(action => {
            const{ mode, page } = action.payload;
            let fetch = api.fetchAllProjects.bind(api);
            if(mode === 'myOwn') {
                fetch = api.fetchOwnProjects.bind(api);
            }
            return Rx.Observable.fromPromise(fetch(page)).map(response => {
                return { ...response, page };
            });
        })
        .map(response => receiveProjects(response));

const updateProjectEpic = (action$, store) =>
    action$
        .ofType(UPDATE_PROJECT)
        .do(action =>
            api
                .updateProject(action.payload)
                .then(res => {
                    debug('update success', res.data.id);
                    store.dispatch(fetchProjects(0, 'all'));
                    store.dispatch(push(`/detail/${res.data.id}`));
                })
                .catch(err => debug(err))
        )
        .ignoreElements();

const deleteConfirmEpic = (action$, store) =>
    action$
        .ofType(CONFIRM_DELETE_PROJECT)
        .switchMap(action => {
            const{ projectId } = action.payload;
            return Rx.Observable.fromPromise(api.getProject(projectId));
        })
        .map(({ data }) => openDeleteConfirmation(data));

const deleteProjectEpic = (action$, store) =>
    action$
        .ofType(DELETE_PROJECT)
        .switchMap(action => {
            const{ projectId } = action.payload;
            return Rx.Observable.fromPromise(api.deleteProject(projectId));
        })
        .do(_ => store.dispatch(closeDeleteConfirmation()))
        .map(_ => reloadProjects());

const searchProjectEpic = (action$, store) =>
    action$
        .ofType(REQUEST_SEARCH_PROJECTS)
        .do(_ => store.dispatch(fetchingProjects()))
        .switchMap(action => {
            const keyword = action.payload.keyword;
            return api.searchProjects(keyword);
        })
        .map(({ data }) => {
            return receiveSearchProjectsResult(data);
        });

const reloadProjectsEpic = (action$, store) =>
    action$
        .ofType(RELOAD_PROJECTS)
        .do(_ => store.dispatch(fetchingProjects()))
        .switchMap(_ => {
            const{ searchQuery } = store.getState().manager;
            return api.reloadProjects(searchQuery);
        })
        .map(({ data }) => {
            return receiveReloadedProjectsResult(data);
        });

export default createEpicMiddleware(
    combineEpics(
        signIn,
        fetchProjectEpic,
        fetchProjectsEpic,
        fetchOwnProjectsEpic,
        updateProjectEpic,
        deleteConfirmEpic,
        deleteProjectEpic,
        searchProjectEpic,
        reloadProjectsEpic,
        goBackHomeEpic,
        changedProjectListPageHookEpic
    )
);
