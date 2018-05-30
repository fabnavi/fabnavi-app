import React from 'react';
import PropTypes from 'prop-types';

import CaptionField from './CaptionField';

const CaptionsField = ({ figures, handleCaptionsChange, onAddCaptionButtonClick }) => {
    return (
        <div className='field_captions'>
            <style jsx>{`
                .field_captions {
                    margin-left: 30px;
                    overflow-y: scroll;
                    height: 718px;
                }
                .edit {
                    background-color: #C4C4C4;
                    color: black;
                    font-size: 20px;
                    margin-top: 0;
                    margin-bottom: 10px;
                }
                .field_caption_wrapper {
                    margin-bottom: 20px;
                }
                .field_caption {
                    margin-left: 100px;
                }
                .field_caption span {
                    display: inline-block;
                    width: 70px;
                    margin: 0 20px;
                }
                .field_caption span:nth-child(4) {
                    margin: 0;
                }
                .field_captions_index {
                    margin-bottom: -24px;
                }
                ul {
                    margin: 0;
                    padding: 0;
                }
                .addCaptionButton {
                    margin-left: 100px;
                }
            `}</style>
            <p className="edit">
                Captions
            </p>
            <div className='field_caption'>
                <span style={{ marginLeft: '0' }}>start(sec)</span>
                <span>end(sec)</span>
                <span style={{ width: '200px' }}>text</span>
                <span>destroy?</span>
            </div>
            {
                figures.map((figure, figureIndex) => {
                    return (
                        <div className='field_caption_wrapper' key={`figure_${figureIndex}_captions`}>
                            <div className='field_captions_index'>Image: {`${figureIndex + 1}`}</div>
                            <ul>
                                {
                                    figure.captions.map((caption, index) => {
                                        return (
                                            <CaptionField
                                                caption={caption}
                                                index={index}
                                                figureIndex={figureIndex}
                                                handleCaptionsChange={handleCaptionsChange}
                                                key={`caption_0_${index}`}
                                            />
                                        )
                                    })
                                }
                            </ul>
                            <button className="addCaptionButton" onClick={onAddCaptionButtonClick} data-index={figureIndex}>add caption</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

CaptionsField.propTypes = {
    figures: PropTypes.array,
    handleCaptionsChange: PropTypes.func,
    onAddCaptionButtonClick: PropTypes.func
}


export default CaptionsField;
