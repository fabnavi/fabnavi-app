import styled, { css } from 'styled-components';

export const IconStyle = styled.img`
    width: 60px;
    height: 60px;
    margin: 0;
    border-radius: 50%;
    margin-right: 20px;
    margin-top: -15px;
    transition: 0.1s ease-in-out;

    &:hover {
        opacity: 0.5;
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

export const LogoStyle = styled.img`
    width: 200px;
    margin: 0;
    margin-top: -10px;
    margin-left: 50px;
    margin-bottom: 30px;
    transition: 0.1s ease-in-out;

    &:hover {
	    opacity: 0.5;
    }
`;
