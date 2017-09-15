import Debug from 'debug';

const debug = Debug('fabnavi:workspace:canvas');

export default class MainView {
    constructor(canvasElement) {
        debug('canvaselemebt', canvasElement)
        this.reset();
        this.cvs = canvasElement;
        this.ctx = this.cvs.getContext('2d');
    }

    draw() {
        this.ctx.fillStyle = 'red';
    }
}