import React from 'react';
import PropTypes from 'prop-types';

import CaptionField from './CaptionField';

import {
    EditBanner,
    StyledCaptionsField,
    CaptionFieldSpan,
    StyledCaptionField,
    CaptionFieldWrapper,
    CaptionFieldIndex,
    AddCaptionButton
} from '../../stylesheets/application/ProjectEditForm/CaptionsField';

const CaptionsField = ({ figures, contentType, handleCaptionsChange, onAddCaptionButtonClick }) => {
    return (
        <StyledCaptionsField>
            <EditBanner className="edit">Captions</EditBanner>
            <StyledCaptionField>
                <CaptionFieldSpan text="start" contentType={contentType}>start</CaptionFieldSpan>
                <CaptionFieldSpan text="end" contentType={contentType}>end</CaptionFieldSpan>
                <CaptionFieldSpan text="text" contentType={contentType}>text</CaptionFieldSpan>
                <CaptionFieldSpan>destroy?</CaptionFieldSpan>
            </StyledCaptionField>
            {figures.map((figure, figureIndex) => {
                return (
                    <CaptionFieldWrapper
                        key={`figure_${figureIndex}_captions`}
                        figureWillBeDeleted={figure._destroy}
                    >
                        <CaptionFieldIndex>Image: {`${figureIndex + 1}`}</CaptionFieldIndex>
                        <ul style={{ margin: '0', padding: '0' }}>
                            {figure.captions.map((caption, index) => {
                                return (
                                    <CaptionField
                                        caption={caption}
                                        index={index}
                                        figureIndex={figureIndex}
                                        contentType={contentType}
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
        </StyledCaptionsField>
    );
};

CaptionsField.propTypes = {
    figures: PropTypes.array,
    contentType: PropTypes.string,
    handleCaptionsChange: PropTypes.func,
    onAddCaptionButtonClick: PropTypes.func
};

export default CaptionsField;
