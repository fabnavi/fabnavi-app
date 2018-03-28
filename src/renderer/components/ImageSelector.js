import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';
import { buildFigureUrl } from '../utils/playerUtils'
import { assetsPath } from '../utils/assetsUtils';

const debug = Debug('fabnavi:jsx:ImageSelector');

class ImageSelector extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    // destroy player on unmount
    componentWillUnmount() {

    }

    render() {
        const thumbs = this.props.contents.filter(content => content.figure).map((content, idx) => {
            return <li key={`thumb${idx}`} className='thumbnail'>
                <style jsx>{`
                  .thumbnail {
                    margin: 0 0 10px;
                    width: 200px;
                  }
                  .thumbnail-image {
                    width: 200px;
                    height: auto;
                    margin: 0;
                  }
                `}</style>
                <img
                    src={buildFigureUrl(content.figure ? content.figure.file.thumb.url : `${assetsPath}/images/video-thumbnail.png` )}
                    className='thumbnail-image'
                    data-index={idx}
                    onClick={this.props.handleThumbnailClick}/>
            </li>;
        })
        return (
            <div
                style={{
                    display: 'table-cell',
                    verticalAlign: 'top',
                    padding: '0',
                    paddingLeft: '20px',
                }}
            >
                <style jsx>{`
                    .title {
                      font-size: 18px;
                      font-weight: 700;
                      margin-bottom: 10px;
                    }
                    .thumbnails {
                      overflow-x: hidden;
                      overflow-y: scroll;
                      list-style: none;
                      height: 718px;
                      width: 220px;
                      padding: 0;
                      margin: 0;
                      background: rgba(255,255,255, 0.8);
                    }
                `}</style>
                <div className='title'>Project Images</div>
                <ul className='thumbnails'>{thumbs}</ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        project: state.player.project
    }
);

ImageSelector.propTypes = {
    project: PropTypes.object,
    contents: PropTypes.array,
    handleThumbnailClick: PropTypes.func
};

export default connect(mapStateToProps)(ImageSelector);
