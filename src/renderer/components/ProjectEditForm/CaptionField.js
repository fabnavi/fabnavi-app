import React from 'react';
import PropTypes from 'prop-types';
import { secondsToHHMMSS } from '../../utils/playerUtils';

import {
    CaptionFieldStyle,
    InputID,
    InputText,
    InputTime,
    InputDestroy,
} from '../../stylesheets/application/ProjectEditForm/CaptionField';

const CaptionField = ({ caption, index, figureIndex, contentType, handleCaptionsChange }) => {
    return (
        <CaptionFieldStyle onChange={handleCaptionsChange} data-figure-index={figureIndex} data-index={index}>
            <InputID name="id" data-index={index} defaultValue={caption.id || null} />
            <InputTime
                name="start_sec"
                step="1"
                min="00:00:00"
                max="00:59:59"
                data-index={index}
                defaultValue={secondsToHHMMSS(caption.start_sec)}
                contentType={contentType}
            />
            <InputTime
                name="end_sec"
                step="1"
                min="00:00:00"
                max="00:59:59"
                data-index={index}
                defaultValue={secondsToHHMMSS(caption.end_sec)}
                contentType={contentType}
            />
            <InputText name="text" data-index={index} defaultValue={caption.text} />
            <InputDestroy name="_destroy" data-index={index} defaultChecked={false} />
        </CaptionFieldStyle>
    );
};

CaptionField.propTypes = {
    caption: PropTypes.object,
    index: PropTypes.number,
    figureIndex: PropTypes.number,
    contentType: PropTypes.string,
    handleCaptionsChange: PropTypes.func
};

export default CaptionField;
