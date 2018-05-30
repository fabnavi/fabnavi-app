import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';
import { buildFigureUrl } from '../../utils/playerUtils'
import { assetsPath } from '../../utils/assetsUtils';

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
        return (
            <div className='root'>
                <style jsx>{`
                    .root {
                        display: table-cell;
                        vertical-align: top;
                        padding: 0;
                        padding-left: 20px;
                    }
                    .title {
                        font-size: 18px;
                        font-weight: 700;
                        margin-bottom: 10px;
                    }
                `}</style>
                <div className='title'>Project Images</div>
                <Thumbnails
                    figures={this.props.contents.filter(content => content.figure).map(content => content.figure)}
                    onClick={this.props.handleThumbnailClick}
                />
            </div>
        )
    }
}

const Thumbnails = ({ figures, onClick }) => (
    <ul className='thumbnails'>
        <style jsx>{`
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
        {
            figures.map((figure, idx) => (
                <Thumbnail figure={figure} index={idx} onClick={onClick} key={`thumb${idx}`}/>
            ))
        }

    </ul>
)

Thumbnails.propTypes = {
    figures: PropTypes.array,
    onClick: PropTypes.func
};

const Thumbnail = ({ figure, index, onClick }) => (
    <li className='thumbnail'>
        <style jsx>{`
            .thumbnail {
                position: relative;
                margin: 0 0 10px;
                width: 200px;
            }
            .thumbnail-image {
                width: 200px;
                height: auto;
                margin: 0;
                cursor: pointer;
            }
            p {
                margin: 0;
                padding-left: 10px;
                position: absolute;
                top:0;
                left: 0;
                width: 20px;
                height: 20px;
                background: rgba(255, 255, 255, 0.6);
                color: black;
            }
        `}</style>
        <img
            src={buildFigureUrl(figure ? figure.file.thumb.url : `${assetsPath}/images/video-thumbnail.png` )}
            className='thumbnail-image'
            data-index={index}
            onClick={onClick}
        />
        <p>{index + 1}</p>
    </li>
)

Thumbnail.propTypes = {
    figure: PropTypes.object,
    onClick: PropTypes.func,
    index: PropTypes.number
};

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
