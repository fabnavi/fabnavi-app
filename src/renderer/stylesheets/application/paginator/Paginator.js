import styled, { css } from 'styled-components';

export const PaginatorFrame = styled.div`
    width: 100%;
    font-size: 20px;
    text-align: left;
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

export const StyledPaginatorButton = styled.img`
    width: 40px;
    height: 40px;
    margin: 0;
    margin-top: 25px;
    margin-right: 20px;
    transition: 0.1s ease-in-out;

    &:hover {
        opacity: 0.5;
    }
`;
