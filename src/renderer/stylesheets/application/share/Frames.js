import styled, { css } from 'styled-components';

export const PageFrame = styled.div`
    display: flex;
    margin-top: 50px;
`;

export const LeftFrame = styled.div`
    flex: 1;
    text-align: right;
`;

export const CenterFrame = styled.div`
    width: 1200px;
    display: flex;
    flex-direction: column;
`;

export const RightFrame = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-start;
    text-align: left;
    margin-left: -30px;
`;
