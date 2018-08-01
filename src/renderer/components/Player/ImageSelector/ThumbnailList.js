import React from 'react';
import PropTypes from 'prop-types';

import Thumbnail from './Thumbnail'
import { StyledThumbnailList } from '../../../stylesheets/player/ImageSelector/ThumbnailList';


const ThumbnailList = ({ figures, onClick }) => (
    <StyledThumbnailList>
        {figures.map((figure, idx) =>
            <Thumbnail
                figure={figure}
                index={idx}
                onClick={onClick}
                key={`thumb${idx}`}
            />
        )}
    </StyledThumbnailList>
);

ThumbnailList.propTypes = {
    figures: PropTypes.array,
    onClick: PropTypes.func
};

export default ThumbnailList;
