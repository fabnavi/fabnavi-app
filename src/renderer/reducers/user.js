import { handleActions } from 'redux-actions';
import Debug from 'debug';

const debug = Debug('fabnavi:reducer:user');

const initialState = {
    isLoggedIn: false,
    credential: {
        accessToken: '',
        client: '',
        uid: '',
    },
    id: ''
};

export default handleActions({
    SIGNED_IN: (state, action) => {
        debug(action);
        return Object.assign({}, state, {
            isLoggedIn: true,
            credential: action.payload.credential,
            id: action.payload['id'] ? action.payload.id : ''
        }
        );
    },
    SIGNED_OUT: (state, action) => {
        return initialState;
    }
}, initialState);
