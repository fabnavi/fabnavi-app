import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Debug from 'debug';
import { buildFigureUrl } from '../../utils/playerUtils';
import { assetsPath } from '../../utils/assetsUtils';

import {
    Title,
    ThumbnailStyle,
    ThumbnailImage,
    ThumbnailNum,
    ThumbnailList,
    Root
} from '../../stylesheets/player/ImageSelector';

const debug = Debug('fabnavi:jsx:ImageSelector');

class ImageSelector extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    // destroy player on unmount
    componentWillUnmount() {}

    render() {
        return (
            <Root>
                <Title>Project Images</Title>
                <Thumbnails
                    figures={this.props.contents.filter(content => content.figure).map(content => content.figure)}
                    onClick={this.props.handleThumbnailClick}
                />
            </Root>
        );
    }
}

const Thumbnails = ({ figures, onClick }) => (
    <ThumbnailList>
        {figures.map((figure, idx) => <Thumbnail figure={figure} index={idx} onClick={onClick} key={`thumb${idx}`} />)}
    </ThumbnailList>
);

Thumbnails.propTypes = {
    figures: PropTypes.array,
    onClick: PropTypes.func
};

const Thumbnail = ({ figure, index, onClick }) => (
    <ThumbnailStyle>
        <ThumbnailImage
            src={buildFigureUrl(figure ? figure.file.thumb.url : `${assetsPath}/images/video-thumbnail.png`)}
            className="thumbnail-image"
            data-index={index}
            onClick={onClick}
        />
        <ThumbnailNum>{index + 1}</ThumbnailNum>
    </ThumbnailStyle>
);

Thumbnail.propTypes = {
    figure: PropTypes.object,
    onClick: PropTypes.func,
    index: PropTypes.number
};

const mapStateToProps = state => ({
    project: state.player.project
});

ImageSelector.propTypes = {
    project: PropTypes.object,
    contents: PropTypes.array,
    handleThumbnailClick: PropTypes.func
};

export default connect(mapStateToProps)(ImageSelector);
