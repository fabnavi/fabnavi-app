import styled, { css } from 'styled-components';

export const IconStyle = styled.img`
    width: 60px;
    height: 60px;
    margin: 0;
    border-radius: 50%;
    margin-right: 20px;
    margin-top: -15px;

    &:hover {
        cursor: pointer;
        border: 1px dashed black;
    }

    ${props =>
        props.help &&
        css`
            width: 42px;
            height: 42px;
            margin-left: 10px;
            margin-top: 0;
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
    margin-left: 100px;
    margin-top: -24px;

    &:hover {
        cursor: pointer;
        border: 1px dashed black;
    }
`;
