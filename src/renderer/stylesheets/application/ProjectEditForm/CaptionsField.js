import styled, { css } from 'styled-components';

export const EditBanner = styled.p`
    background-color: #c4c4c4;
    color: black;
    font-size: 20px;
    margin-top: 0;
    margin-bottom: 10px;
`;

export const StyledCaptionsField = styled.div`
    margin-left: 30px;
    overflow-y: scroll;
    height: 718px;
`;

export const StyledCaptionField = styled.div`
    margin-left: 100px;
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
    return css`
        width: 50px;
    `;
};

export const CaptionFieldSpan = styled.span`
    display: inline-block;
    width: 70px;
    margin: 0 20px;

    &:nth-child(1) {
        margin-left: 0;
        margin-right: 40px;
    }

    &:nth-child(3) {
        width: 200px;
    }

    &:nth-child(4) {
        margin: 0;
    }

    ${props => props.text && props.contentType && SpanProperty(props)};
`;

export const CaptionFieldWrapper = styled.div`
    margin-bottom: 20px;
    opacity: ${props => props.figureWillBeDeleted ? '0.3' : '1.0'};
    pointer-events: ${props => props.figureWillBeDeleted ? 'none' : 'auto'};
`;

export const CaptionFieldIndex = styled.div`
    margin-bottom: -24px;
`;

export const AddCaptionButton = styled.button`
    margin-left: 100px;
`;
