import { combineEpics, createEpicMiddleware } from 'redux-observable';
import Rx from 'rxjs';
import Debug from 'debug';

import Calibrator from '../player/CalibrateController';
import {
    PLAYER_CHANGE_MODE,
    UPDATE_CALIBRATION,
    playerChangePage,
    updateCalibration
} from '../actions/player';

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

// export default store => next => action => {

//     debug('action', action);
//     debug('state', store.getState());

//     const state = store.getState();
//     const mode = state.player.mode;

//     // TODO: load localStorage.
//     if( action.type === 'PLAYER_CHANGE_MODE' && mode === 'player') {
//         action.type = 'UPDATE_CALIBRATION';
//         action.config = calibrator.getConfig();
//         next(action);
//     }

//     if(action.type === 'PLAYER_CHANGE_MODE') {
//         if(mode === 'calibrateCenter') {
//             debug(action);
//             switch(action.command) {
//                 case 'MOVE_RIGHT':
//                     action.config = calibrator.moveRegion(action.step, 0);
//                     break;
//                 case 'MOVE_LEFT':
//                     action.config = calibrator.moveRegion(-action.step, 0);
//                     break;
//                 case 'MOVE_DOWN':
//                     action.config = calibrator.moveRegion(0, -action.step);
//                     break;
//                 case 'MOVE_UP':
//                     action.config = calibrator.moveRegion(0, action.step);
//                     break;
//                 default:
//                     break;
//             }
//         }
//         if(mode === 'calibrateScale') {
//             debug(action);
//             switch(action.command) {
//                 case 'ZOOM_OUT':
//                     action.config = calibrator.zoomIO(1.01, 1.01);
//                     break;
//                 case 'ZOOM_IN':
//                     action.config = calibrator.zoomIO(0.99, 0.99);
//                     break;
//                 case 'LONGER_HORIZONTAL':
//                     action.config = calibrator.changeRegion(-action.step, 0);
//                     break;
//                 case 'SHORTER_HORIZONTAL':
//                     action.config = calibrator.changeRegion(action.step, 0);
//                     break;
//                 case 'LONGER_VERTICAL':
//                     action.config = calibrator.changeRegion(0, action.step);
//                     break;
//                 case 'SHORTER_VERTICAL':
//                     action.config = calibrator.changeRegion(0, -action.step);
//                     break;
//                 default:
//                     break;
//             }
//         }

//         // TODO: after updating config, set to localStorage.
//         debug(action.config);
//         action.type = 'UPDATE_CALIBRATION';
//         next(action);
//         return;
//     }
//     next(action);
// };

