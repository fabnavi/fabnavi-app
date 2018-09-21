import styled, { css } from 'styled-components';
import { colors } from '../../common/colors';
import { buttonProperties } from '../../common/buttonProperties';

export const EditBanner = styled.p`
    color: black;
    font-size: 20px;
    margin-top: 0;
    margin-bottom: 10px;
`;

export const StyledCaptionsField = styled.div`
    margin-left: 20px;
    padding-right: 10px;
    overflow-y: scroll;
    height: 433px;
`;

export const StyledCaptionFieldHeader = styled.div`
    margin-left: 100px;
    padding-bottom: 10px;
`;

const SpanProperty = props => {
    if(props.contentType === 'photo' && (props.text === 'start' || 'end')) {
        return css`
            display: none;
        `
    }
    if(props.text === 'start') {
        return css`
            margin-left: 0;
        `;
    }
};

export const CaptionFieldSpan = styled.span`
    display: inline-block;
    margin: 0 10px;
    font-weight: 500;

    &:nth-child(1) {
        margin-left: 0;
        margin-right: 20px;
    }

    &:nth-child(2) {
        margin-right: 20px;
    }

    &:nth-child(3) {
        width: 180px;
    }

    &:nth-child(4) {
        margin: 0;
    }

    ${props => props.text && props.contentType && SpanProperty(props)};
`;

export const CaptionFieldWrapper = styled.div`
    opacity: ${props => props.figureWillBeDeleted ? '0.3' : '1.0'};
    pointer-events: ${props => props.figureWillBeDeleted ? 'none' : 'auto'};
`;

export const CaptionFieldIndex = styled.div`
    margin-bottom: -32px;
    margin-top: 10px;
`;

export const CaptionFieldList = styled.ul`
    margin: 0;
    padding: 10px 0 0 0;
    border-top: 1px solid #CCC;
`

export const AddCaptionButton = styled.button`
    margin-left: 100px;
    margin-bottom: 15px;
    font-size: 12px;
    border: none;
    ${buttonProperties({
        width: 425,
        height: 34,
        color: '#FFF',
        backgroundColor: colors.button.green
    })};
`;
