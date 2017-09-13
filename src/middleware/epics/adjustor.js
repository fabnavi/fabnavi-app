import { combineEpics, createEpicMiddleware } from 'redux-observable';
import Rx from 'rxjs';
import Debug from 'debug';

import Calibrator from '../../player/CalibrateController';
import {
    PLAYER_CHANGE_MODE,
    UPDATE_CALIBRATION,
    playerChangePage,
    updateCalibration
} from '../../actions/player';

const debug = Debug('fabnavi:middleware:adjustor');
const calibrator = new Calibrator();
window.calibrator = calibrator;

const calibrateCenterModeEpic = (action$, store) => {
    return action$.ofType(PLAYER_CHANGE_MODE)
        .filter(action => store.getState().player.mode === 'calibrateCenter')
        .do(action => {
            debug('state', store.getState());
            debug('action', action);
            debug('fire calibrationCenter')
        })
        .ignoreElements();
}

const calibrateScaleModeEpic = (action$, store) => {
    return action$.ofType(PLAYER_CHANGE_MODE)
        .filter(action => store.getState().player.mode === 'calibrateScale')
        .do(action => {
            debug('state', store.getState())
            debug('action', action)
            debug('fire calibrateScale')
        })
        .ignoreElements();
}

export default createEpicMiddleware(combineEpics(
    calibrateCenterModeEpic,
    calibrateScaleModeEpic
));
