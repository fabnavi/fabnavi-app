import styled from 'styled-components';

export const CaptionFieldStyle = styled.li`
    margin-left: 100px;
`;

export const InputID = styled.input.attrs({
    type: 'hidden'
})`
    margin: 0 18px;
`;

export const InputTime = styled.input.attrs({
    type: 'time'
})`
    margin: 0 18px 0 0 ;
`;

export const InputNumber = styled.input.attrs({
    type: 'number'
})`
    width: 70px;
`;

export const InputText = styled.input.attrs({
    type: 'text'
})`
    width: 200px;
`;

export const InputDestroy = styled.input.attrs({
    type: 'checkbox'
})`
    margin: 0 18px;
`;
