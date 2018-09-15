import styled, { css } from 'styled-components';

export const Button = styled.button`
    font-family: 'YuGothic-Medium';
    font-size: 18px;
    border-radius: 3px;
    padding: 0.25em 1em;
    margin: 0 1em;
    background: #00ba9e;
    color: white;
    border: 1px #00ba9e;

    ${props =>
        props.cancel &&
        css`
            background: #707070;
            color: white;
            border: 1px #707070;
        `};

    ${props =>
        props.delete &&
        css`
            background: white;
            color: black;
            border: 1px #000000;
        `};
`;

export const StyledReloadButton = styled.img`
    width: 42px;
    height: 42px;
    margin-left: 22px;

    &:hover {
        border: 1px dashed black;
    }
`;
