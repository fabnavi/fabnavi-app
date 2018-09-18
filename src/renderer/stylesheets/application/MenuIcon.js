import styled, { css } from 'styled-components';

export const StyledIcon = styled.img`
    width: 55px;
    height: 55px;
    margin: 0;
    border-radius: 50%;
    margin-right: 20px;
    margin-top: -13px;

    &:hover {
        cursor: pointer;
        border: 1px dashed black;
    }
`;

export const StyledWord = styled.p`
    margin: 0px;
    margin-right: 20px;
    margin-bottom: 140px;

    &:hover {
        cursor: pointer;
        color: #3ba3fe;
    }
`;

export const StyledLogo = styled.img`
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
`
