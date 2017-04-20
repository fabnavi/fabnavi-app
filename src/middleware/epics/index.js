import { combineEpics, createEpicMiddleware } from 'redux-observable';
import Debug from 'debug';
const debug = Debug('fabnavi:epics');

const signIn = action$ => {
  debug(action$);
  return action$.ofType('SIGN_IN')
    .do(action => { debug('Sign in', action) })
    .ignoreElements();
}

export default createEpicMiddleware(combineEpics(
  signIn
));