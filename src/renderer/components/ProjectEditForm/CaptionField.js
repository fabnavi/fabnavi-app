import React from 'react';
import PropTypes from 'prop-types';
import { secondsToHHMMSS } from '../../utils/playerUtils';

const CaptionField = ({ caption, index, figureIndex, handleCaptionsChange }) => {
    return (
        <li className='field_caption' onChange={handleCaptionsChange} data-figure-index={figureIndex} data-index={index}>
            <style jsx>{`
                .field_caption {
                    margin-left: 100px;
                }
                .field_caption span {
                    display: inline-block;
                    width: 70px;
                    margin: 0 20px;
                }
                .field_caption input {
                    margin: 0 18px;
                }
                .field_caption input[type="time"] {
                    margin: 0 0 0 18px;
                }
                .field_caption input[type="number"] {
                    width: 70px;
                }
                .field_caption input[type="text"] {
                    width: 200px;
                }
            `}</style>
            <input name='id' data-index={index} type="hidden" defaultValue={caption.id || null}/>
            <input name='start_sec'
                type="time"
                step='1'
                min="00:00:00"
                max="00:59:59"
                style={{ marginLeft: '0' }}
                data-index={index}
                defaultValue={secondsToHHMMSS(caption.start_sec)}/>
            <input name='end_sec'
                type="time"
                step='1'
                min="00:00:00"
                max="00:59:59"
                data-index={index}
                defaultValue={secondsToHHMMSS(caption.end_sec)}/>
            <input name='text' data-index={index} type="text" defaultValue={caption.text}/>
            <input name='_destroy' data-index={index} type="checkbox" defaultChecked={false}/>
        </li>
    )
};

CaptionField.propTypes = {
    caption: PropTypes.object,
    index: PropTypes.number,
    figureIndex: PropTypes.number,
    handleCaptionsChange: PropTypes.func
}


export default CaptionField;
