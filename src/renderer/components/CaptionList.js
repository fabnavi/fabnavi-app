import React from 'react';
import PropTypes from 'prop-types';
import Caption from './Caption'

import {
    StyledCaptionList,
    StyledList,
} from '../stylesheets/application/ProjectShow/CaptionList';


import {
    StyledHead
} from '../stylesheets/application/ProjectShow/StyledProjectDetail';

export default function CaptionList({ figures, contentType }) {
    return (
        <StyledCaptionList>
            <StyledHead>Captions</StyledHead>
            <StyledList>
                {
                    figures.map((figure, figureIndex) => (
                        {
                            entities: figure.captions.sort((a, b) => (a.start_sec - b.start_sec)),
                            figureIndex
                        }
                    )).map((captions) => {
                        return captions.entities.map((caption, index) => (
                            <Caption
                                caption={caption}
                                figureIndex={captions.figureIndex}
                                isLast={(index === captions.entities.length - 1)}
                                contentType={contentType}
                                key={index}
                            />
                        ))
                    })
                }
            </StyledList>
        </StyledCaptionList>
    );
}

CaptionList.propTypes = {
    figures: PropTypes.array,
    contentType: PropTypes.string
};
