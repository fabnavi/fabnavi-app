import React from 'react';
import PropTypes from 'prop-types';

import CaptionField from './CaptionField';

import {
    EditBanner,
    StyledCaptionsField,
    CaptionFieldSpan,
    StyledCaptionFieldHeader,
    CaptionFieldWrapper,
    CaptionFieldIndex,
    CaptionFieldList,
    AddCaptionButton
} from '../../stylesheets/application/ProjectEditForm/CaptionsField';

const CaptionsField = ({ figures, contentType, handleCaptionsChange, onAddCaptionButtonClick }) => {
    return (
        <StyledCaptionsField>
            <EditBanner className="edit">Captions</EditBanner>
            <StyledCaptionFieldHeader>
                <CaptionFieldSpan text="start" contentType={contentType}>start(h:m:s)</CaptionFieldSpan>
                <CaptionFieldSpan text="end" contentType={contentType}>end(h:m:s)</CaptionFieldSpan>
                <CaptionFieldSpan text="text" contentType={contentType}>caption</CaptionFieldSpan>
                <CaptionFieldSpan>delete</CaptionFieldSpan>
            </StyledCaptionFieldHeader>
            {figures.map((figure, figureIndex) => {
                return (
                    <CaptionFieldWrapper
                        key={`figure_${figure.id}_captions`}
                        figureWillBeDeleted={figure._destroy}
                    >
                        <CaptionFieldIndex> {`${contentType}#${figureIndex + 1}`}</CaptionFieldIndex>
                        <CaptionFieldList>
                            {figure.captions.map((caption, index) => {
                                return (
                                    <CaptionField
                                        caption={caption}
                                        index={index}
                                        figureIndex={figureIndex}
                                        contentType={contentType}
                                        handleCaptionsChange={handleCaptionsChange}
                                        key={`caption_${figureIndex}_${index}`}
                                    />
                                );
                            })}
                        </CaptionFieldList>
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
