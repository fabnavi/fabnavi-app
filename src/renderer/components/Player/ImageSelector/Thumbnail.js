import React from 'react';
import PropTypes from 'prop-types';
import { buildFigureUrl } from '../../../utils/playerUtils';
import { assetsPath } from '../../../utils/assetsUtils';

import {
    StyledThumbnail,
    Image,
    Index,
} from '../../../stylesheets/player/ImageSelector/Thumbnail';

const Thumbnail = ({ figure, index, onClick }) => (
    <StyledThumbnail>
        <Image
            src={buildFigureUrl(figure ? figure.file.thumb.url : `${assetsPath}/images/video-thumbnail.png`)}
            className="thumbnail-image"
            data-index={index}
            onClick={onClick}
        />
        <Index>{index + 1}</Index>
    </StyledThumbnail>
);

Thumbnail.propTypes = {
    figure: PropTypes.object,
    index: PropTypes.number,
    onClick: PropTypes.func,
};

export default Thumbnail;
