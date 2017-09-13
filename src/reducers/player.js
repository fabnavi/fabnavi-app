import { handleActions } from 'redux-actions';
import Debug from 'debug';

const debug = Debug('fabnavi:reducer:player');

const PlayerModes = [
    'play', 'calibrateCenter', 'calibrateScale'
];

const initialState = {
    mode: 'play',
    contentType: 'photo',
    page: 0,
    project: null,
    currentTime: 0,
    config: {
        x: 0,
        y: 0,
        w: 1000,
        h: 1000
    }
}

export default handleActions({
    '@@router/LOCATION_CHANGE': (state, action) => {
        if(action.payload.pathname === '/') {
            return initialState
        }
    },
    PLAYER_CHANGE_PAGE: (state, action) => {
        debug('player change', action);
        let page = state.page + action.payload.step;
        if(page >= state.project.content.length) {
            page = state.project.content.length - 1;
        }
        if(page < 0) page = 0;
        return {
            ...state,
            page: page,
        };
    },
    RECEIVE_PROJECT: (state, action) => {
        debug('Receive project: ', action);
        let contentType = state.contentType;
        const project = action.payload;
        if(project.content[0] && project.content[0].type === 'Figure::Frame') {
            contentType = 'movie';
        }
        return Object.assign({}, state, {
            project: project,
            contentType
        });
    },
    UPDATE_CALIBRATION: (state, action) => {
        return Object.assign({}, state, {
            config: action.config
        });
    },
    PLAYER_EXIT: (state, action) => {
        debug('player exit, nothing to do');
        return initialState;
    },
    PLAYER_CHANGE_MODE: (state, action) => {
        return Object.assign({}, state, {
            mode: nextMode(state)
        });
    }
}, initialState);

function nextMode(state) {
    let index = PlayerModes.indexOf(state.mode) + 1;
    if(index >= PlayerModes.length) {
        index = 0;
    }
    return PlayerModes[index];
}
