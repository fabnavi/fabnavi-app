import React from 'react';
import PropTypes from 'prop-types';

import Thumbnail from './Thumbnail'
import { StyledThumbnailList } from '../../../stylesheets/player/ImageSelector/ThumbnailList';


const ThumbnailList = ({ figures, onClick, isEditable, onThumbnailDeleteButtonClick }) => (
    <StyledThumbnailList>
        {figures.map((figure, idx) =>
            <Thumbnail
                figure={figure}
                index={idx}
                onClick={onClick}
                key={`thumb${idx}`}
                isEditable={isEditable}
                onDeleteButtonClick={onThumbnailDeleteButtonClick}
            />
        )}
    </StyledThumbnailList>
);

ThumbnailList.propTypes = {
    figures: PropTypes.array,
    onClick: PropTypes.func,
    isEditable: PropTypes.bool,
    onThumbnailDeleteButtonClick: PropTypes.func
};

export default ThumbnailList;
