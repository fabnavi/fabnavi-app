import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';
import videojs from 'video.js'
import 'videojs-playlist';

import { buildCaptions, buildFigureUrl } from '../utils/playerUtils'

const debug = Debug('fabnavi:jsx:VideoPlayer');

class VideoPlayer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isPlaying : false,
            index: this.props.index,
        }
        this.handleClick = (e) => {
            debug('event', e)
            const video = document.querySelector('video');
            if(this.state.isPlaying) {
                video.pause();
            } else {
                video.play();
            }
            this.setState({ isPlaying: !this.state.isPlaying });
            return;
        }
    }

    updatePlaylist(project) {
        const figures = project.content.filter(content => content.figure).map(content => content.figure)
        const buildPlaylistOption = (figure) => {
            return {
                sources: [{
                    src: buildFigureUrl(figure.file.url),
                    type: 'video/mp4'
                }],
                poster: buildFigureUrl(figure.file.thumb.url),
                textTracks: [buildCaptions(figure.captions.filter(caption => caption._destroy !== true))]
            }
        };

        const playlistOptions = figures.map(figure => buildPlaylistOption(figure));
        this.player.playlist(playlistOptions)
    }

    componentDidMount() {
        // instantiate Video.js
        this.player = videojs(this.videoNode);
        this.updatePlaylist(this.props.project);
        this.player.playlist.autoadvance(0)
    }

    // destroy player on unmount
    componentWillUnmount() {
        if(this.player) {
            this.player.dispose()
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.index !== nextProps.index) {
            this.player.playlist.currentItem(nextProps.index);
        } else if(nextProps.project) {
            this.updatePlaylist(nextProps.project);
        }
    }
    // wrap the player in a div with a `data-vjs-player` attribute
    // so videojs won't create additional wrapper in the DOM
    // see https://github.com/videojs/video.js/pull/3856
    render() {
        const dataSetup = this.props.size === 'small' ?
            '{ "playbackRates": [0.5, 1, 1.5, 2], "width": 720, "height": 405 }' :
            '{ "playbackRates": [0.5, 1, 1.5, 2], "width": 1280, "height": 640 }';
        return (
            <div
                onClick={this.handleClick}
                onContextMenu={this.handleClick}
                style={{ display: 'table-cell' }}
                data-update={this.props.toggleUpdate}
            >
                <div data-vjs-player>
                    <video ref={ node => (this.videoNode = node) }
                        data-setup={dataSetup}
                        id='video'
                        className="video-js"
                        controls={true}
                        preload='auto'
                    >
                    </video>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        project: state.player.project
    }
);

VideoPlayer.propTypes = {
    project: PropTypes.object,
    index: PropTypes.number,
    figures: PropTypes.array,
    toggleUpdate: PropTypes.bool,
    size: PropTypes.string
};

export default connect(mapStateToProps)(VideoPlayer);
