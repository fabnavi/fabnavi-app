import { handleActions } from 'redux-actions';
import Debug from 'debug';

import {
    OPEN_DELETE_CONFIRMATION,
    CLOSE_DELETE_CONFIRMATION
} from '../actions/manager';

const debug = Debug('fabnavi:reducer:modals');

const initialState = {
    targetProject: null,
    showDeleteConfirmation: false
};

export default handleActions({
    [OPEN_DELETE_CONFIRMATION]: (state, action) => {
        const{ projectId } = action.payload;
        return Object.assign({}, state, {
            targetProject: projectId,
            showDeleteConfirmation: true
        })
    },
    [CLOSE_DELETE_CONFIRMATION]: (state, action) => {
        return Object.assign({}, state, {
            targetProject: null,
            showDeleteConfirmation: false
        })
    }
}, initialState);