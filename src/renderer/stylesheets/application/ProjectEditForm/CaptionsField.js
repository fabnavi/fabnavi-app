import styled, { css } from 'styled-components';

export const EditBanner = styled.p`
    background-color: #c4c4c4;
    color: black;
    font-size: 20px;
    margin-top: 0;
    margin-bottom: 10px;
`;

export const CaptionsFieldStyle = styled.div`
    margin-left: 30px;
    overflow-y: scroll;
    height: 718px;
`;

export const CaptionFieldStyle = styled.div`
    margin-left: 100px;
`;

const SpanProperty = props => {
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

    &:nth-child(4) {
        margin: 0;
    }

    ${props => props.text && SpanProperty(props.text)};
`;

export const CaptionFieldWrapper = styled.div`
    margin-bottom: 20px;
`;

export const CaptionFieldIndex = styled.div`
    margin-bottom: -24px;
`;

export const AddCaptionButton = styled.button`
    margin-left: 100px;
`;
