import styled, { css } from 'styled-components';

export const IconStyle = styled.img`
    width: 54px;
    height: 54px;
    margin: 0;
    border-radius: 50%;
    margin-right: 20px;

    &:hover {
        cursor: pointer;
        border: 1px dashed black;
    }

    ${props =>
        props.help &&
        css`
            width: 42px;
            height: 42px;
            margin-top: 35px;
            margin-left: 10px;
        `};
`;

export const LinkStyle = styled.a`
    margin: 0px;
    margin-right: 20px;
    margin-bottom: 140px;

    &:hover {
        color: #3ba3fe;
    }
`;

export const LogoStyle = styled.img`
    width: 84px;
    height: 84px;
    margin: 0;
    border-radius: 50%;
    margin-right: 20px;
    margin-top: 10px;

    &:hover {
        cursor: pointer;
        border: 1px dashed black;
    }
`;
