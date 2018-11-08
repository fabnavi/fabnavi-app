import styled, { css } from 'styled-components';
import { colors } from '../../common/colors';
import { buttonProperties } from '../../common/buttonProperties';

export const StyledEditButton = styled.button`
    font-size: 40px;
    border: none;
    margin-right: 50px;
    ${buttonProperties({
        width: 205,
        height: 100,
        color: '#fff',
        backgroundColor: colors.button.green
    })};
`;

export const StyledDeleteButton = styled.button`
    font-size: 20px;
    border: 1px solid #555;
    margin-top: 20px;
    margin-right: 50px;
    ${buttonProperties({
        width: 205,
        height: 50,
        color: '#707070',
        backgroundColor: '#fff'
    })};
`;
