import Debug from 'debug';

const debug = Debug('fabnavi:workspace:MainView');

export default class MainView {
    constructor(canvasElement) {
        debug('element', canvasElement)
        this.reset();
        this.cvs = canvasElement;
        debug('canvas', this.cvs);
        this.ctx = this.cvs.getContext('2d');
    }

    draw() {
        this.ctx.fillStyle = 'red';
    }
}