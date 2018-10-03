import React from 'react';
import PropTypes from 'prop-types';
import { SortableContainer } from 'react-sortable-hoc';

import Thumbnail from './Thumbnail'
import { StyledThumbnailList } from '../../../stylesheets/player/ImageSelector/ThumbnailList';


const ThumbnailList = SortableContainer(({ figures, contentType, onClick, isEditable, size, currentThumbnailIndex, onThumbnailDeleteButtonClick }) => (
    <StyledThumbnailList size={size}>
        {figures.map((figure, index) => {
            return (<Thumbnail
                figure={figure}
                index={index}
                sortIndex={index}
                onClick={onClick}
                key={`thumb${index}`}
                size={size}
                contentType={contentType}
                isEditable={isEditable}
                isSelected={index === currentThumbnailIndex}
                onDeleteButtonClick={onThumbnailDeleteButtonClick}
            />);
        })}
    </StyledThumbnailList>
));

ThumbnailList.propTypes = {
    figures: PropTypes.array,
    contentType: PropTypes.string,
    onClick: PropTypes.func,
    size: PropTypes.string,
    currentThumbnailIndex: PropTypes.number,
    isEditable: PropTypes.bool,
    onThumbnailDeleteButtonClick: PropTypes.func
};

export default ThumbnailList;
