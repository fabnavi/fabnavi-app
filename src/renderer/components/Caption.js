import React from 'react';
import PropTypes from 'prop-types';
import { secondsToHHMMSS } from '../utils/playerUtils';

import {
    StyledCaption,
    MetaData,
    Text
} from '../stylesheets/application/ProjectShow/Caption';

export default function Caption({ caption, contentType, figureIndex, isLast }) {
    return (
        <StyledCaption isLast={isLast}>
            <MetaData>
                {contentType}#{figureIndex + 1}: {secondsToHHMMSS(caption.start_sec)}
            </MetaData>
            <Text>{caption.text}</Text>
        </StyledCaption>
    );
}

Caption.propTypes = {
    caption: PropTypes.object,
    contentType: PropTypes.string,
    figureIndex: PropTypes.number,
    isLast: PropTypes.bool
};
