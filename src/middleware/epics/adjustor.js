import { combineEpics, createEpicMiddleware } from 'redux-observable';
import Rx from 'rxjs';
import Debug from 'debug';

import Calibrator from '../../player/CalibrateController';
import {
    PLAYER_CHANGE_MODE,
    UPDATE_CALIBRATION,
    updateCalibration,
    CALIBRATE,
    calibrate
} from '../../actions/player';

const debug = Debug('fabnavi:middleware:adjustor');
const calibrator = new Calibrator();
window.calibrator = calibrator;

const calibrateCenterModeEpic = (action$, store) => {
    return action$.ofType(CALIBRATE)
        .filter(action => store.getState().player.mode === 'calibrateCenter')
        .do(action => {
            switch(action.command) {
                case 'MOVE_RIGHT':
                    action.config = calibrator.moveRegion(-action.step, 0);
                    break;
                case 'MOVE_LEFT':
                    action.config = calibrator.moveRegion(action.step, 0);
                    break;
                case 'MOVE_DOWN':
                    action.config = calibrator.moveRegion(0, action.step);
                    break;
                case 'MOVE_UP':
                    action.config = calibrator.moveRegion(0, -action.step);
                    break;
                default:
                    break;
            }
            debug('after action config', action.config);
        })
        .do(action => {
            store.dispatch(updateCalibration(action.config));
        })
        .ignoreElements();
}

const calibrateScaleModeEpic = (action$, store) => {
    return action$.ofType(CALIBRATE)
        .filter(action => store.getState().player.mode === 'calibrateScale')
        .do(action => {
            debug('calibrationScale mode state', store.getState())
            debug('calibrationScale mode action', action)
            debug('fire calibrateScale')
            switch(action.command) {
                case 'LONGER_HORIZONTAL':
                    action.config = calibrator.changeRegion(-action.step, 0);
                    break;
                case 'SHORTER_HORIZONTAL':
                    action.config = calibrator.changeRegion(action.step, 0);
                    break;
                case 'LONGER_VERTICAL':
                    action.config = calibrator.changeRegion(0, action.step);
                    break;
                case 'SHORTER_VERTICAL':
                    action.config = calibrator.changeRegion(0, -action.step);
                    break;
                default:
                    break;
            }
            debug('action config', action.config);
        })
        .ignoreElements();
}

const updateConfigEpic = (action$, store) => {
    return action$.ofType(PLAYER_CHANGE_MODE)
        .filter(action => store.getState().player.mode === 'play')
        .do(action => {
            debug('update config state', store.getState())
            debug('update config action', action)
            debug('fire cnofig update');
        })
        .ignoreElements();
}

export default createEpicMiddleware(combineEpics(
    calibrateCenterModeEpic,
    calibrateScaleModeEpic,
    updateConfigEpic
));
