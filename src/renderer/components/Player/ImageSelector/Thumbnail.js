import React from 'react';
import PropTypes from 'prop-types';
import { buildFigureUrl } from '../../../utils/playerUtils';
import { assetsPath } from '../../../utils/assetsUtils';

import DeleteButton from './DeleteButton';

import {
    StyledThumbnail,
    Image,
    Index,
} from '../../../stylesheets/player/ImageSelector/Thumbnail';

const Thumbnail = ({ figure, index, onClick, onDeleteButtonClick, isEditable, size }) => (
    <StyledThumbnail data-index={index}>
        <Image
            src={buildFigureUrl(figure ? figure.file.thumb.url : `${assetsPath}/images/video-thumbnail.png`)}
            data-index={index}
            size={size}
            willBeDeleted={figure._destroy}
            onClick={onClick}
        />
        <Index>{index + 1}</Index>
        {
            isEditable ? (
                <DeleteButton onClick={onDeleteButtonClick}/>
            ) : null
        }
    </StyledThumbnail>
);

Thumbnail.propTypes = {
    figure: PropTypes.object,
    index: PropTypes.number,
    onClick: PropTypes.func,
    onDeleteButtonClick: PropTypes.func,
    isEditable: PropTypes.bool,
    size: PropTypes.string
};

export default Thumbnail;
