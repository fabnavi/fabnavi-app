import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Debug from 'debug';

import MainView from '../player/MainView';

const debug = Debug('fabnavi:jsx:Player');


class Player extends React.Component {

  constructor(props) {
    super(props);
    this.clearCanvas = () => {
      this.canvas.clear();
    };
    this.canvas = null;
    this.currentImage = null,
    this.lastPage = 0,
    this.lastState = '',
    this.currentState = '';

    this.updateCanvas = this.updateCanvas.bind(this);
    this.video = document.createElement('video');
    this.renderingTimer = null;
  }

  render() {
    return (
      <div>
        <canvas ref="mainCanvas" />
      </div>
    );
  }

  updateCanvas() {
    const project = this.props.project;
    const isValidProject = () => {
      return typeof project === 'object' && project.content.length !== 0;
    };
    if(!isValidProject()) {
      debug('invalid project data', project);
      return;
    }

    if( this.props.contentType === 'movie') {
      if(this.video.src === '') {
        this.video.width = window.screen.width;
        this.video.height = window.screen.height;
        this.video.src = project.content[0].figure.file.file.url;
      }
      if(this.props.isPlaying) {
        this.renderingTimer = setInterval(() => {
          this.canvas.render(this.video);
        }, 30);
        this.video.play();
      } else {
        clearInterval(this.renderingTimer);
        this.video.pause();
      }
      return;
    }

    this.currentState = this.props.mode;
    if( this.currentState != this.lastState ) {
      this.canvas.clear();
    }
    this.lastState = this.currentState;

    const getCurrentImage = () => {
      return new Promise((resolve, reject) => {
        if( this.lastPage === this.props.page && this.currentImage != null ) {
          resolve(this.currentImage);
          return;
        }

        const fig = this.props.project.content[this.props.page].figure;
        this.lastPage = this.props.page;
        if(fig.hasOwnProperty('clientContent') && fig.clientContent.hasOwnProperty('dfdImage')) {
          fig.clientContent.dfdImage
          .then(img => {
            resolve(img, true);
          })
          .catch(reject);
          return;
        }

        const img = new Image();
        this.canvas.redraw();
        this.canvas.drawWaitingMessage();
        if(this.lastPage === 0) {
          this.canvas.drawInstructionMessage();
        }
        img.src = fig.file.file.url;
        img.onload = (event) => {
          resolve(event.target);
        }
        img.onerror = reject;
      });
    };

    getCurrentImage()
    .then(img => {
      this.currentImage = img;
      this.canvas.draw(this.currentImage, this.props.config);

      if(this.lastPage === 0) {
        this.canvas.drawInstructionMessage();
      }

      switch(this.currentState) {
        case 'calibrateCenter':
          this.canvas.drawCalibrateCenterLine();
          this.canvas.drawCenterInstruction();
          break;
        case 'calibrateScale':
          this.canvas.drawCalibrateScaleLine();
          this.canvas.drawScaleInstruction();
          break;
        default:
          break;
      }
    })
    .catch(e => {
      debug('failed to load Image', e);
    });
  }

  componentWillMount() {
    if(!this.props.project) {
      debug('project not loaded!');
      api.getProject(location.pathname.split('/')[2]);
    }
  }

  componentDidMount() {
    this.canvas = new MainView( ReactDOM.findDOMNode(this.refs.mainCanvas));
  }

  componentDidUpdate() {
    this.updateCanvas();
  }
}

function mapStateToProps(state) {
  return state.player
}

export default connect(mapStateToProps)(Player);
