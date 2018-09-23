import styled, { css } from 'styled-components';

import { colors } from '../../common/colors';

export const SignOutButton = styled.button`
    width: 122px;
    font-size: 20px;
    border-radius: 8px;
    padding: 0.25em 1em;
    margin: 0;
    margin-right: 23px;
    color: #707070;
    background-color: #fff;
    border-width: 1px;
    border-color: #707070;
    transition: 0.1s ease-in-out;

    &:hover {
        color: #fff;
        background-color: #707070;
    }
`;

export const DeleteButton = styled.button`
    width: 122px;
    font-size: 20px;
    border-radius: 8px;
    padding: 0.25em 1em;
    margin: 0 1em;
    color: white;
    background: ${colors.button.green};
    border: none;
    transition: 0.1s ease-in-out;

    &:hover {
        opacity: 0.5;
    }
`;

export const Button = styled.button`
    width: 122px;
    font-size: 20px;
    border-radius: 8px;
    padding: 0.25em 1em;
    margin: 0 1em;
    color: #707070;
    border: 1px #707070;
    transition: 0.1s ease-in-out;

    &:hover {
        opacity: 0.5;
    }

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
    width: 51px;
    height: 42px;
    margin-left: 22px;
    margin-right: 10px;
    transition: 0.1s ease-in-out;

    &:hover {
        opacity: 0.5;
    }
`;
