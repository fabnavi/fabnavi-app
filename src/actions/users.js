import { createAction } from "redux-actions";

import Act from "./Types";

export const signedOut = createAction(Act.SIGNED_OUT);
export const signingOut = createAction(Act.SIGNING_OUT);
export const signInFailed = createAction(Act.SIGN_IN_FAILED);
export const signedIn = createAction(Act.SIGNED_IN);
