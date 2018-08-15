import React from 'react';
import PropTypes from 'prop-types';

import { StyledDeleteButton } from '../../../stylesheets/player/ImageSelector/Thumbnail';

const DeleteButton = ({ onClick }) => (
    <StyledDeleteButton onClick={onClick}>
    x
    </StyledDeleteButton>
);

DeleteButton.propTypes = {
    onClick: PropTypes.func
}

export default DeleteButton;
