import { combineEpics, createEpicMiddleware } from 'redux-observable';
import Debug from 'debug';
const debug = Debug('fabnavi:epics');

const signIn = action$ => {
    debug(action$);
    return action$.ofType('SIGN_IN')
        .do(action => {
            debug('Sign in', action)
        })
        .ignoreElements();
}

const deleteProject = action$ => {
    debug(action$);
    return action$.ofType('@@router/LOCATION_CHANGE')
        .do(action => {
            if(action.payload.pathname.match('delete')) {
                const projectId = action.payload.pathname.match(/\d+/)[0];
                api.deleteProject(projectId)
                    .then(() => {
                        api.getOwnProjects();
                    })
                    .catch((error) => {
                        debug(error);
                    });
            }
        })
        .ignoreElements();
}

export default createEpicMiddleware(combineEpics(
    signIn,
    deleteProject
));
