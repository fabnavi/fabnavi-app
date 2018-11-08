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
    width: 100px;
    height: 100px;
    margin: 0;
    margin-right: ${props => (props.next ? '53px' : '0px')};
    margin-left: ${props => (props.prev ? '53px' : '0px')};
    transition: 0.1s ease-in-out;

    &:hover {
        opacity: 0.5;
    }
`;
