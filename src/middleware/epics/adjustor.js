import { combineEpics, createEpicMiddleware } from 'redux-observable';
import Rx from 'rxjs';
import Debug from 'debug';

import Calibrator from '../../player/CalibrateController';
import {
    PLAYER_CHANGE_MODE,
    updateCalibration,
    CALIBRATE
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
        .map(action => updateCalibration(action.config));
}

const calibrateScaleModeEpic = (action$, store) => {
    return action$.ofType(CALIBRATE)
        .filter(action => store.getState().player.mode === 'calibrateScale')
        .do(action => {
            switch(action.command) {
                case 'ZOOM_OUT':
                    action.config = calibrator.zoomIO(1.01, 1.01);
                    break;
                case 'ZOOM_IN':
                    action.config = calibrator.zoomIO(0.99, 0.99);
                    break;
                default:
                    break;
            }
            debug('action config', action.config);
        })
        .map(action => updateCalibration(action.config));
}

const updateConfigEpic = (action$, store) => {
    return action$.ofType(PLAYER_CHANGE_MODE)
        .filter(action => store.getState().player.mode === 'play')
        .map(action => {
            debug('update config state', store.getState())
            debug('update config action', action)
            debug('fire cnofig update');
        });
}

export default createEpicMiddleware(combineEpics(
    calibrateCenterModeEpic,
    calibrateScaleModeEpic,
    updateConfigEpic
));
