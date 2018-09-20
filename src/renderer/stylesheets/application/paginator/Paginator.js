import styled, { css } from 'styled-components';

export const PaginatorFrame = styled.ul`
    width: 100%;
    font-size: 20px;
    text-align: left;
    margin-left: 70px;
`;

const ButtonProperty = props => {
    if(props.prev) {
        return css`
            cursor: pointer;
            background: #bdbdbd;
            user-select: none;
            border-radius: 4px;
            text-align: center;
            transition: 0.4s;
        `;
    }
    return css`
        cursor: pointer;
        width: 80px;
        background: #bdbdbd;
        user-select: none;
        border-radius: 4px;
        text-align: center;
        transition: 0.4s;
    `;
};

export const StyledPagonatorButton = styled.img`
    width: 40px;
    height: 40px;
    margin: 0;
    margin-top: 25px;
    margin-right: 20px;

    &:hover {
        cursor: pointer;
        border: 1px dashed black;
    }
`;

export const PaginatorButton = styled.li`
    display: inline-block;
    margin-left: 110px;
    width: 80px;
    height: 30px;
    padding: 5px 10px;
    list-style-type: none;
    font-weight: bold;
    text-decoration: none;
    color: #fff;
    background: #f2f2f2;
    user-select: none;
    border-radius: 4px;
    text-align: center;
    &:hover {
        ${props =>
        props.button &&
            css`
                background: #848484;
            `};
    }

    ${props => props.button && ButtonProperty(props.button)};
`;
