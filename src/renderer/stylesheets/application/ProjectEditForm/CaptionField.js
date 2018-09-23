import styled, { css } from 'styled-components';

const willRemoveCaptionProperty = css`
    filter: brightness(0.8);
    opacity: 0.6;
`;

export const StyledCaptionField = styled.li`
    margin-left: 100px;
    margin-bottom: 10px;
    ${props => props.willBeRemoved ? willRemoveCaptionProperty : null}
`;


export const InputID = styled.input.attrs({
    type: 'hidden'
})`
    margin: 0 18px;
`;

const inputTimeProperty = props => {
    if(props.contentType === 'photo') {
        return css`
            display: none;
        `
    }
}

const baseProperty = css`
    height: 20px;
    border-radius: 4px;
    border: 1px solid black;
    font-family: Helvetica, Arial, '游ゴシック Medium', 'Yu Gothic Medium', '游ゴシック体', YuGothic, sans-serif;
`

export const InputTime = styled.input.attrs({
    type: 'time'
})`
    margin: 0 10px 0 0 ;
    padding: 0 5px;
    ${props => props.contentType && inputTimeProperty(props)};
    ${baseProperty}
`;

export const InputNumber = styled.input.attrs({
    type: 'number'
})`
    width: 70px;
`;

export const InputText = styled.input.attrs({
    type: 'text'
})`
    width: 170px;
    padding: 0 5px;
    ${baseProperty}
`;

export const InputDestroy = styled.input.attrs({
    type: 'checkbox'
})`
    margin: 0 18px;
`;
