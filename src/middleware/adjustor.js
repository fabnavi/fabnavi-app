import Debug from 'debug';

import Calibrator from '../player/CalibrateController';

const debug = Debug('fabnavi:middleware:adjustor');
const calibrator = new Calibrator();
window.calibrator = calibrator;
export default store => next => action => {

  // TODO: load localStorage.
  if( action.type === 'CHANGE_FRAME' && action.frame === 'player') {
    action.type = 'UPDATE_CALIBRATION';
    action.config = calibrator.getConfig();
    next(action);
  }

  if(action.type === 'CALIBRATE') {
    debug(action);
    switch(action.command) {
      case 'ZOOM_OUT':
        action.config = calibrator.zoomIO(1.01, 1.01);
        break;
      case 'ZOOM_IN':
        action.config = calibrator.zoomIO(0.99, 0.99);
        break;
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
      case 'MOVE_RIGHT':
        action.config = calibrator.moveRegion(action.step, 0);
        break;
      case 'MOVE_LEFT':
        action.config = calibrator.moveRegion(-action.step, 0);
        break;
      case 'MOVE_DOWN':
        action.config = calibrator.moveRegion(0, -action.step);
        break;
      case 'MOVE_UP':
        action.config = calibrator.moveRegion(0, action.step);
        break;
      default:
        break;
    }

    // TODO: after updating config, set to localStorage.
    debug(action.config);
    action.type = 'UPDATE_CALIBRATION';
    next(action);
    return;
  }
  next(action);
};

