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
        this.drawOutlinedText('Now Loading...', this.width / 2 - 300, this.height / 2);
    }

    drawOutlinedText(text, x, y) {
        const outlineColor = '#343434';
        const fillColor = '#FFFFFF';
        this.ctx.strokeStyle = outlineColor;
        this.ctx.strokeText(text, x, y);
        this.ctx.fillStyle = fillColor;
        this.ctx.fillText(text, x, y);
    }

    drawInstructionMessage() {
        const instructionMessages = [
            ' C : Calibration Mode',
            '← : To Privious Page',
            '→ : To Next Page',
            'esc : Back To Home'
        ];
        const fontSize = 40;
        const lineHeight = fontSize * 1.5;
        this.ctx.font = `${fontSize}px NotoSans-Regular, sans-serif`;
        this.ctx.textBaseline = 'top';
        this.ctx.lineWidth = 8.0;

        const x = this.width / 8;
        const y = this.height / 8;
        instructionMessages.forEach((text, index) => {
            this.drawOutlinedText(text, x, y + index * lineHeight)
        })
    }

    drawCenterInstruction() {
        this.ctx.font = '30px NotoSans-Regular, sans-serif';
        this.ctx.textBaseline = 'top';
        this.ctx.lineWidth = 3.0;
        this.drawOutlinedText('CalibrateCenter Mode', this.width / 8, this.height / 8 - 50)

        const instructionMessages = [
            ' ↑  : Up',
            ' ↓  : Down',
            '← : Left',
            '→ : Right',
            ' C : ScaleCalibration',
        ];
        this.ctx.font = '20px NotoSans-Regular, sans-serif';
        this.ctx.textBaseline = 'top';
        this.ctx.lineWidth = 3.0;
        const x = this.width / 8;
        const y = this.height / 8;
        instructionMessages.forEach((text, index) => {
            this.drawOutlinedText(text, x, y + index * 30)
        });
    }

    drawScaleInstruction() {
        this.ctx.font = '30px NotoSans-Regular, sans-serif';
        this.ctx.textBaseline = 'top';
        this.ctx.lineWidth = 3.0;
        this.drawOutlinedText('CalibrateScale Mode', this.width / 8, this.height / 8 - 50)

        const instructionMessages = [
            ' ↑  : Zoom In',
            ' ↓  : Zoom Out',
            ' C : Back to Play',
        ];
        this.ctx.font = '20px NotoSans-Regular, sans-serif';
        this.ctx.textBaseline = 'top';
        this.ctx.lineWidth = 3.0;
        const x = this.width / 8;
        const y = this.height / 8;
        instructionMessages.forEach((text, index) => {
            this.drawOutlinedText(text, x, y + index * 30)
        });
    }

    drawShootingMessage() {
        this.ctx.fillStyle = '#343434';
        this.ctx.font = '100px NotoSans-Regular, sans-serif';
        this.ctx.translate(-(this.width / 2 + 300), -(this.height / 2));
        this.ctx.fillText('Taking picture...', 0, 0);
        this.ctx.translate(this.width / 2 + 300, this.height / 2);
    }

    drawCaptions(captions) {
        if(captions.length === 0 ) return;
        const fontSize = 80;
        const lineHeight = fontSize * 1.75;
        this.ctx.font = `${fontSize}px NotoSans-Regular, sans-serif`;
        this.ctx.textBaseline = 'top';
        captions.map(caption => caption.text).forEach((text, index) => {
            this.drawCaption(text, index, captions.length, lineHeight);
        })
    }

    drawCaption(text, index, lineCount, lineHeight) {
        const width = this.ctx.measureText(text).width;
        const x = this.width / 2 - width / 2;
        const y = this.height - lineHeight * (lineCount - index + 1);
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        this.ctx.fillRect(x - 10, y - 10, width + 20, lineHeight);
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillText(text, x, y);
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
        const sx = Number(conf.x) || 0,
                sy = Number(conf.y) || 0,
                sw = Number(conf.w) || img.width || img.videoWidth,
                sh = Number(conf.h) || img.height || img.videoHeight,
                /* set project area */
                dx = 0,
                dy = 0,
                dw = cvs.width,
                dh = dw * sh / sw;

        ctx.save();
        ctx.translate(cvs.width / 2, cvs.height / 2);
        ctx.rotate(180 * Math.PI / 180);
        ctx.fillStyle = 'black';
        ctx.drawImage(img, sx, sy, sw, sh, dx + (-dw / 2), dy + (-dh / 2 + 50), dw, dh);
        ctx.restore();
    }

    render(video, conf) {
        this._draw(video, conf, this.cvs, this.ctx);
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
