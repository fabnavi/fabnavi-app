import { css } from 'styled-components';

export const buttonProperties = ({ width, height, color, backgroundColor }) => {
    return css`
        padding: 5px 10px;
        width: ${width - 20}px;
        height: ${height - 10}px;
        text-align: center;
        text-transform: capitalize;
        border-radius: 4px;
        color: ${color};
        background-color: ${backgroundColor};
        :hover {
            cursor: pointer;
            opacity: 0.6;
        }
    `
}
