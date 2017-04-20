import Debug from 'debug';

const debug = Debug('fabnavi:player:canvas');

export default class MainView {

  constructor(canvasElement) {

    this.currentImage = null;
    this.convertQuality = 0.7;
    this.reset();
    this.cvs = canvasElement;
    this.ctx = this.cvs.getContext('2d');
    this.cvs.width = this.width = screen.width;
    this.cvs.height = this.height = screen.height;
    this.conf = null;
    this.ctx.strokeStyle = '#00ff00';
    this.clear();
  }

  reset() {
    if(this.ctx != null)this.clear();
    this.currentImage = null;
    this.ctx = null;
    this.cvs = null;
  }

  drawCalibrateCenterLine() {
    this.redraw();
    this.ctx.strokeStyle = '#539ECD';
    this.ctx.beginPath();
    this.ctx.lineWidth = 3.0;
    this.ctx.moveTo(0, this.height / 2);
    this.ctx.lineTo(this.width, this.height / 2);
    this.ctx.moveTo(this.width / 2, 0);
    this.ctx.lineTo(this.width / 2, this.height);
    this.ctx.stroke();
  }

  drawCalibrateScaleLine() {
    this.redraw();
    this.ctx.strokeStyle = '#DC5536';
    this.ctx.beginPath();
    this.ctx.lineWidth = 3.0;
    this.ctx.moveTo(0, this.height / 2);
    this.ctx.lineTo(this.width, this.height / 2);
    this.ctx.moveTo(this.width / 2, 0);
    this.ctx.lineTo(this.width / 2, this.height);
    this.ctx.stroke();
  }

  drawWaitingMessage() {
    this.ctx.font = '100px NotoSans-Regular, sans-serif';
    this.ctx.textBaseline = 'top';
    this.ctx.lineWidth = 5.0;
    this.ctx.strokeStyle = '#343434';
    this.ctx.strokeText('Now Loading...', this.width / 2 - 300, this.height / 2);
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillText('Now Loading...', this.width / 2 - 300, this.height / 2);
  }

  drawInstructionMessage() {
    this.ctx.font = '20px NotoSans-Regular, sans-serif';
    this.ctx.textBaseline = 'top';
    this.ctx.lineWidth = 3.0;
    this.ctx.strokeStyle = '#343434';
    this.ctx.strokeText(' C : Calibration Mode', this.width / 8, this.height / 8);
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillText(' C : Calibration Mode', this.width / 8, this.height / 8);
    this.ctx.strokeStyle = '#343434';
    this.ctx.strokeText('← : To Privious Page', this.width / 8, this.height / 8 + 30);
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillText('← : To Privious Page', this.width / 8, this.height / 8 + 30);
    this.ctx.strokeStyle = '#343434';
    this.ctx.strokeText('→ : To Next Page', this.width / 8, this.height / 8 + 60);
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillText('→ : To Next Page', this.width / 8, this.height / 8 + 60);
    this.ctx.strokeStyle = '#343434';
    this.ctx.strokeText('→ : To Next Page', this.width / 8, this.height / 8 + 90);
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillText('→ : To Next Page', this.width / 8, this.height / 8 + 90);
    this.ctx.strokeStyle = '#343434';
    this.ctx.strokeText('esc : Back To Home', this.width / 8, this.height / 8 + 120);
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillText('esc : Back To Home', this.width / 8, this.height / 8 + 120);

  }

  drawCenterInstruction() {
    this.ctx.font = '30px NotoSans-Regular, sans-serif';
    this.ctx.textBaseline = 'top';
    this.ctx.lineWidth = 3.0;
    this.ctx.strokeStyle = '#343434';
    this.ctx.strokeText('CalibrateCenter Mode', this.width / 8, this.height / 8 - 50);
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillText('CalibrateCenter Mode', this.width / 8, this.height / 8 - 50);

    this.ctx.font = '20px NotoSans-Regular, sans-serif';
    this.ctx.textBaseline = 'top';
    this.ctx.lineWidth = 3.0;
    this.ctx.strokeStyle = '#343434';
    this.ctx.strokeText(' ↑  : Up', this.width / 8, this.height / 8);
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillText(' ↑  : Up', this.width / 8, this.height / 8);
    this.ctx.strokeStyle = '#343434';
    this.ctx.strokeText(' ↓  : Down', this.width / 8, this.height / 8 + 30);
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillText(' ↓  : Down', this.width / 8, this.height / 8 + 30);
    this.ctx.strokeStyle = '#343434';
    this.ctx.strokeText('← : Left', this.width / 8, this.height / 8 + 60);
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillText('← : Left', this.width / 8, this.height / 8 + 60);
    this.ctx.strokeStyle = '#343434';
    this.ctx.strokeText('→ : Right', this.width / 8, this.height / 8 + 90);
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillText('→ : Right', this.width / 8, this.height / 8 + 90);
    this.ctx.strokeStyle = '#343434';
    this.ctx.strokeText(' C : ScaleCalibration', this.width / 8, this.height / 8 + 120);
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillText(' C : ScaleCalibration', this.width / 8, this.height / 8 + 120);
  }

  drawScaleInstruction() {
    this.ctx.font = '30px NotoSans-Regular, sans-serif';
    this.ctx.textBaseline = 'top';
    this.ctx.lineWidth = 3.0;
    this.ctx.strokeStyle = '#343434';
    this.ctx.strokeText('CalibrateScale Mode', this.width / 8, this.height / 8 - 50);
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillText('CalibrateScale Mode', this.width / 8, this.height / 8 - 50);

    this.ctx.font = '20px NotoSans-Regular, sans-serif';
    this.ctx.textBaseline = 'top';
    this.ctx.lineWidth = 3.0;
    this.ctx.strokeStyle = '#343434';
    this.ctx.strokeText(' ↑  : Zoom In', this.width / 8, this.height / 8);
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillText(' ↑  : Zoom In', this.width / 8, this.height / 8);
    this.ctx.strokeStyle = '#343434';
    this.ctx.strokeText(' ↓  : Zoom Out', this.width / 8, this.height / 8 + 30);
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillText(' ↓  : Zoom Out', this.width / 8, this.height / 8 + 30);
    this.ctx.strokeStyle = '#343434';
    this.ctx.strokeText(' C : Back to Play', this.width / 8, this.height / 8 + 60);
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillText(' C : Back to Play', this.width / 8, this.height / 8 + 60);
  }

  drawShootingMessage() {
    this.ctx.fillStyle = '#343434';
    this.ctx.font = '100px NotoSans-Regular, sans-serif';
    this.ctx.translate(-(this.width / 2 + 300), -(this.height / 2));
    this.ctx.fillText('Taking picture...', 0, 0);
    this.ctx.translate(this.width / 2 + 300, this.height / 2);
  }

  draw(img, conf, cvs, ctx) {
    if(!cvs) {
      cvs = this.cvs;
    }
    if(!ctx) {
      ctx = cvs.getContext('2d');
    }
    this._draw(img, conf, cvs, ctx);
    this.currentImage = img;
    this.conf = conf;
  }

  _draw(img, conf, cvs, ctx) {

    if(!conf && this.conf) {
      conf = this.conf;
    }
    /* set cropping area on image  */

    let sx = Number(conf.x) || 0,
        sy = Number(conf.y) || 0,
        sw = Number(conf.w) || img.width || img.videoWidth,
        sh = Number(conf.h) || img.height || img.videoHeight,

        /* set project area */
        dx = 0,
        dy = 0,
        dw = cvs.width,
        dh = cvs.height;

    ctx.fillStyle = 'black';

    if(sy < 0) {
      const StoDh = dh / sh;
      dy = sy * StoDh;
      dh += dy;
      sh += sy;
      sy = 0;
      dy *= -1;
      ctx.fillRect(0, 0, cvs.width, dy);
    }

    if(sx < 0) {
      const StoDw = dw / sw;
      dx = sx * StoDw;
      dw += dx;
      sw += sx;
      sx = 0;
      dx *= -1;
      ctx.fillRect(0, 0, dx, cvs.height);
    }

    if(sx + sw > img.width) {
      const StoDw = dw / sw;
      sw -= sx + sw - img.width;
      dw = sw * StoDw;
      ctx.fillRect(dx + dw, 0, cvs.width - dx - dw, cvs.height);
    }

    if(sy + sh > img.height) {
      const StoDh = dh / sh;
      sh -= sy + sh - img.height;
      dh = sh * StoDh;
      ctx.fillRect(0, dy + dh, cvs.width, 100);
    }
    ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
  }

  render(video, conf) {
    this._draw(video, this.ctx, conf);
  }

  redraw() {
    debug('redraw');
    this.clear();
    if(this.currentImage)this.draw(this.currentImage);
  }

  toBlob(img, conf) {
    return new Promise(resolve => {
      const cvs = document.createElement('canvas');
      cvs.width = img.naturalWidth;
      cvs.height = img.naturalHeight;
      this._draw(img, cvs.getContext('2d'), conf);
      cvs.toBlob(blob => {
        resolve(blob);
      }, 'image/jpeg', this.convertQuality);
    });
  }

  clear() {
    debug('clear');
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  getCurrentImage() {
    return this.currentImage || false;
  }

  toDataURL() {
    return this.cvs.toDataURL();
  }

  drawMessage(message, x, y) {
    this.ctx.fillStyle = 'green';
    this.ctx.font = '100px ArialRoundedMTBoldBold, serif';
    this.ctx.rotate(Math.PI);
    this.ctx.translate(-1500, -800);
    this.ctx.fillText(message, x || 0, y || 20);
    this.ctx.translate(1500, 800);
    this.ctx.rotate(-Math.PI);
  }

}
