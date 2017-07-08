import { createAction } from 'redux-actions';

export const signedOut = createAction('SIGNED_OUT');
export const signingOut = createAction('SIGNING_OUT');
export const signInFailed = createAction('SIGN_IN_FAILED');
export const signedIn = createAction('SIGNED_IN');
