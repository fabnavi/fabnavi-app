import React from 'react';
import PropTypes from 'prop-types';

import Thumbnail from './Thumbnail'
import { StyledThumbnailList } from '../../../stylesheets/player/ImageSelector/ThumbnailList';


const ThumbnailList = ({ figures, contentType, onClick, isEditable, size, index, onThumbnailDeleteButtonClick }) => (
    <StyledThumbnailList size={size}>
        {figures.map((figure, idx) =>
            <Thumbnail
                figure={figure}
                index={idx}
                onClick={onClick}
                key={`thumb${idx}`}
                size={size}
                contentType={contentType}
                isEditable={isEditable}
                isSelected={index === idx}
                onDeleteButtonClick={onThumbnailDeleteButtonClick}
            />
        )}
    </StyledThumbnailList>
);

ThumbnailList.propTypes = {
    figures: PropTypes.array,
    contentType: PropTypes.string,
    onClick: PropTypes.func,
    size: PropTypes.string,
    index: PropTypes.number,
    isEditable: PropTypes.bool,
    onThumbnailDeleteButtonClick: PropTypes.func
};

export default ThumbnailList;
