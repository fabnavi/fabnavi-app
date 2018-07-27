import React from 'react';
import PropTypes from 'prop-types';

import CaptionField from './CaptionField';

import {
    EditBanner,
    CaptionsFieldStyle,
    CaptionFieldSpan,
    CaptionFieldStyle,
    CaptionFieldWrapper,
    CaptionFieldIndex,
    AddCaptionButton
} from '../../stylesheets/application/ProjectEditForm/CaptionsField';

const CaptionsField = ({ figures, handleCaptionsChange, onAddCaptionButtonClick }) => {
    return (
        <CaptionsFieldStyle>
            <EditBanner className="edit">Captions</EditBanner>
            <CaptionFieldStyle>
                <CaptionFieldSpan text="start">start</CaptionFieldSpan>
                <CaptionFieldSpan>end</CaptionFieldSpan>
                <CaptionFieldSpan text="text">text</CaptionFieldSpan>
                <CaptionFieldSpan>destroy?</CaptionFieldSpan>
            </CaptionFieldStyle>
            {figures.map((figure, figureIndex) => {
                return (
                    <CaptionFieldWrapper key={`figure_${figureIndex}_captions`}>
                        <CaptionFieldIndex>Image: {`${figureIndex + 1}`}</CaptionFieldIndex>
                        <ul style={{ margin: '0', padding: '0' }}>
                            {figure.captions.map((caption, index) => {
                                return (
                                    <CaptionField
                                        caption={caption}
                                        index={index}
                                        figureIndex={figureIndex}
                                        handleCaptionsChange={handleCaptionsChange}
                                        key={`caption_0_${index}`}
                                    />
                                );
                            })}
                        </ul>
                        <AddCaptionButton
                            className="addCaptionButton"
                            onClick={onAddCaptionButtonClick}
                            data-index={figureIndex}
                        >
                            add caption
                        </AddCaptionButton>
                    </CaptionFieldWrapper>
                );
            })}
        </CaptionsFieldStyle>
    );
};

CaptionsField.propTypes = {
    figures: PropTypes.array,
    handleCaptionsChange: PropTypes.func,
    onAddCaptionButtonClick: PropTypes.func
};

export default CaptionsField;
