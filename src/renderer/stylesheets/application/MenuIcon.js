import styled, { css } from 'styled-components';

export const IconStyle = styled.img`
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

export const LinkStyle = styled.a`
    margin: 0px;
    margin-right: 20px;
    margin-bottom: 140px;

    &:hover {
        color: #3ba3fe;
    }
`;
