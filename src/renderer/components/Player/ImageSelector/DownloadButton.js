const{ ipcRenderer } = require('electron');
import React from 'react';
import PropTypes from 'prop-types';
import { assetsPath } from '../../../utils/assetsUtils'

import { StyledDownloadButton } from '../../../stylesheets/player/ImageSelector/Thumbnail';
const downloadIcon = `${assetsPath}/images/download.svg`;

const DownloadButton = ({ src }) => (
    <StyledDownloadButton src={downloadIcon} onClick={() => {
        ipcRenderer.send('download', {
            url: src,
            properties: { saveAs: true }
        })
    }}>
    </StyledDownloadButton>
);

DownloadButton.propTypes = {
    src: PropTypes.string
}

export default DownloadButton;
