import React from 'react';
import PropTypes from 'prop-types';
import { assetsPath } from '../../../utils/assetsUtils'

import { StyledDeleteButton } from '../../../stylesheets/player/ImageSelector/Thumbnail';
const deleteIcon = `${assetsPath}/images/deleteFigure.svg`;

const DeleteButton = ({ onClick }) => (
    <StyledDeleteButton src={deleteIcon} onClick={onClick} />
);

DeleteButton.propTypes = {
    onClick: PropTypes.func
}

export default DeleteButton;
