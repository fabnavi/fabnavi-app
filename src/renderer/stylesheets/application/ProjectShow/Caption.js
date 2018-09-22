import styled, { css } from 'styled-components';

export const StyledCaption = styled.li`
    margin: 0;
    padding: 30px 0 0;
    &:after {
        position: relative;
        display: block;
        content: '';
        width: ${props => props.isLast ? '100%' : '500px'};
        height: 30px;
        border-bottom: 1px solid #707070;
    }

`;

export const MetaData = styled.p`
    margin: 0;
    font-size: 22px;
    line-height: 36px;
    text-decoration: underline;
    text-transform: capitalize;
`;

export const Text = styled.p`
    margin: 0;
    font-size: 22px;
    line-height: 36px;
`;
