import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';

import MainView from '../player/MainView';
import { playerChangePage } from '../actions/player';
import VideoPlayer from './Player/VideoPlayer';
import ImageSelector from './Player/ImageSelector';

import { buildFigureUrl } from '../utils/playerUtils';

import { ImagePlayer, ImageType } from '../stylesheets/player/Player';

const debug = Debug('fabnavi:jsx:Player');

export class Player extends React.Component {
    constructor(props) {
        super(props);
        this.clearCanvas = () => {
            this.canvas.clear();
        };
        this.canvas = null;
        this.currentImage = null;
        this.lastPage = 0;
        this.lastState = '';
        this.currentState = '';

        this.updateCanvas = this.updateCanvas.bind(this);
        this.setCanvasElement = cvs => {
            this.canvasElement = cvs;
        };
        this.handleClick = e => {
            if(this.props.mode === 'play') {
                if(e.button !== 0) {
                    this.props.changePage(1);
                } else {
                    this.props.changePage(-1);
                }
            }
        };
        this.state = {
            index: 0,
            toggleUpdate: false
        };
        this.handleThumbnailClick = e => {
            e.stopPropagation();
            if(this.props.contentType === 'movie') {
                this.setState({
                    index: parseInt(e.target.dataset.index, 10)
                });
            } else {
                this.props.changePage(parseInt(e.target.dataset.index, 10) - this.props.page)
            }
        };

        this.videoChanged = index => {
            this.setState({ index: index });
        };
    }

    componentDidMount() {
        debug('canvas element', this.canvasElement);
        if(this.canvasElement) {
            this.canvas = new MainView(this.canvasElement);
            this.updateCanvas();
        }
    }

    render() {
        return (
            <div style={{ display: 'table' }}>
                {this.props.contentType === 'movie' ? (
                    <VideoPlayer
                        project={this.state.project}
                        toggleUpdate={this.state.toggleUpdate}
                        index={this.state.index}
                        handleClick={this.handleClick}
                        videoChanged={this.videoChanged}
                        size={this.props.size}
                        isEditable={this.props.isEditable}
                        ref={instance => (this.videoPlayer = instance)}
                    />
                ) : (
                    <div>
                        {this.props.isEditable && <ImageType>Preview</ImageType>}
                        <canvas
                            style={
                                this.props.size === 'small' ?
                                    {
                                        display: 'table-cell',
                                        width: '544px',
                                        height: '306px'
                                    } :
                                    {
                                        display: 'table-cell',
                                        width: '1040px',
                                        height: '585px',
                                        marginTop: '33px'
                                    }
                            }
                            ref={this.setCanvasElement}
                            onClick={this.handleClick}
                        />
                    </div>
                )}

                {this.props.project ? (
                    <ImageSelector
                        contents={this.props.project.content}
                        handleThumbnailClick={this.handleThumbnailClick}
                        size={this.props.size}
                        index={this.state.index}
                        isEditable={this.props.isEditable}
                        handleThumbnailDeleteButtonClick={this.props.handleThumbnailDeleteButtonClick}
                        handleThumbanailOrderChange={this.props.handleThumbanailOrderChange}
                    />
                ) : null}
            </div>
        );
    }

    updateCanvas() {
        const project = this.props.project;
        const isValidProject = () => {
            if(project === null) {
                return false;
            }
            return typeof project === 'object' && project.content.length !== 0;
        };

        if(!isValidProject()) {
            debug('invalid project data', project);
            return;
        }

        this.currentState = this.props.mode;

        if(this.currentState != this.lastState) {
            this.canvas.clear();
        }
        this.lastState = this.currentState;

        const getCurrentImage = () => {
            return new Promise((resolve, reject) => {
                if(this.lastPage === this.props.page && this.currentImage != null) {
                    resolve(this.currentImage);
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
                this.canvas.drawCaptions(fig.captions.filter(caption => caption._destroy !== true));
                img.src = buildFigureUrl(fig.file.url);
                img.onload = event => {
                    resolve(event.target);
                };
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
                const fig = this.props.project.content[this.props.page].figure;
                this.canvas.drawCaptions(fig.captions.filter(caption => caption._destroy !== true));

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


    getCurrentTime() {
        return this.videoPlayer ?
            this.videoPlayer.getWrappedInstance().getCurrentTime() :
            0;
    }

    componentWillReceiveProps(props) {
        if(props.project)this.setState({ project: props.project, toggleUpdate: !this.state.toggleUpdate });
    }

    componentDidUpdate() {
        if(this.props.contentType === 'photo')this.updateCanvas();
    }
}

export const mapStateToProps = state => ({
    project: state.player.project,
    page: state.player.page,
    config: state.player.config,
    contentType: state.player.contentType,
    mode: state.player.mode
});

export const mapDispatchToProps = dispatch => ({
    changePage: step => {
        dispatch(playerChangePage({ step: step }));
    }
});

Player.propTypes = {
    project: PropTypes.object,
    contentType: PropTypes.string,
    mode: PropTypes.string,
    page: PropTypes.number,
    config: PropTypes.object,
    changePage: PropTypes.func,
    toggleUpdate: PropTypes.bool,
    size: PropTypes.string,
    isEditable: PropTypes.bool,
    handleThumbnailDeleteButtonClick: PropTypes.func,
    handleThumbanailOrderChange: PropTypes.func
};
export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { withRef: true }
)(Player);
