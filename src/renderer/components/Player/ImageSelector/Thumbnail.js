import React from 'react';
import PropTypes from 'prop-types';
import { SortableElement } from 'react-sortable-hoc';

import { buildFigureUrl } from '../../../utils/playerUtils';
import { assetsPath } from '../../../utils/assetsUtils';

import DeleteButton from './DeleteButton';

import {
    StyledThumbnail,
    Image,
    Index,
} from '../../../stylesheets/player/ImageSelector/Thumbnail';

const Thumbnail = SortableElement(({ figure, sortIndex, onClick, onDeleteButtonClick, isSelected, isEditable, size }) => (
    <StyledThumbnail
        data-index={sortIndex}
        size={size}
    >
        <Image
            src={buildFigureUrl(figure ? figure.file.thumb.url : `${assetsPath}/images/video-thumbnail.png`)}
            data-index={sortIndex}
            size={size}
            willBeDeleted={figure._destroy}
            isSelected={isSelected}
            onClick={onClick}
        />
        <Index>{sortIndex + 1}</Index>
        {
            isEditable ? (
                <DeleteButton onClick={onDeleteButtonClick}/>
            ) : null
        }
    </StyledThumbnail>
));

Thumbnail.propTypes = {
    figure: PropTypes.object,
    sortIndex: PropTypes.number,
    onClick: PropTypes.func,
    onDeleteButtonClick: PropTypes.func,
    isEditable: PropTypes.bool,
    isSelected: PropTypes.bool,
    size: PropTypes.string
};

export default Thumbnail;
