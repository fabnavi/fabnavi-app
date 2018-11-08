import styled, { css } from 'styled-components';

export const PageFrame = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 54px;
`;

export const NavFrame = styled.div`
    display: flex;
`;

export const ContentsFrame = styled.div`
    display: flex;
`;

export const FooterFrame = styled.div`
    display: flex;
`;

export const LeftFrame = styled.div`
    flex: 1;
    text-align: left;
`;

export const CenterFrame = styled.div`
    width: 1320px;
    display: flex;
    flex-direction: column;
`;

export const RightFrame = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    margin-right: 25px;
`;
