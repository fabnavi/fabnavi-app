import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';
import videojs from 'video.js'
import 'videojs-playlist';

import { buildCaptions } from '../utils/playerUtils'
import { buildFigureUrl } from '../utils/playerUtils'

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

    componentDidMount() {
        // instantiate Video.js
        this.player = videojs(this.videoNode);
        const playlistOptions = this.props.project.content.filter(content => content.figure).map(content => {
            return {
                sources: [{
                    src: buildFigureUrl(content.figure.file.url),
                    type: 'video/mp4'
                }],
                poster: buildFigureUrl(content.figure.file.thumb.url),
                textTracks: [buildCaptions(content.figure.captions)]
            }
        });
        this.player.playlist(playlistOptions)
        this.player.playlist.autoadvance(0)

    }

    // destroy player on unmount
    componentWillUnmount() {
        if(this.player) {
            this.player.dispose()
        }
    }


    componentWillReceiveProps(nextProps) {
        this.player.playlist.currentItem(nextProps.index)
    }
    // wrap the player in a div with a `data-vjs-player` attribute
    // so videojs won't create additional wrapper in the DOM
    // see https://github.com/videojs/video.js/pull/3856
    render() {
        return (
            <div
                onClick={this.handleClick}
                onContextMenu={this.handleClick}
                style={{ display: 'table-cell' }}
            >
                <div data-vjs-player>
                    <video ref={ node => (this.videoNode = node) }
                        data-setup='{ "playbackRates": [0.5, 1, 1.5, 2] }'
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
    index: PropTypes.number
};

export default connect(mapStateToProps)(VideoPlayer);
