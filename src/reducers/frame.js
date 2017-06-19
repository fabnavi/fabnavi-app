import Debug from 'debug';

import Act from '../actions/Types';

const debug = Debug('fabnavi:reducer:frame');
const initialState = location.pathname.split('/')[1] === 'play' ? 'player' : 'managers';

export default function frameReducer(state = initialState, action) {
    switch(action.type) {
        case Act.CHANGE_FRAME:
            return action.payload;
        case Act.DETAIL_EXIT:
            return action.payload;
        default:
            return state;
    }
}