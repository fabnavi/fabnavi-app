import styled, { css } from 'styled-components';

export const StyledDetailFrame = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0;
    margin-left: 20px;
`;

export const TitleFrame = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-bottom: 25px;
    align-items: flex-end;
`;

export const ProjectTitle = styled.p`
    font-size: 38px;
    font-weight: 700;
    color: #000;
    margin: 0;
    font-feature-settings: 'palt';
    line-break: strict;
    word-break: break-word;
`;

export const PrivateNotation = styled.span`
    font-size: 20px;
    font-weight: 700;
    color: #000;
    margin: 0;
    margin-left: 20px;
    text-decoration: underline;
`;

export const ContentsFrame = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const DescriptionFrame = styled.div`
    width: 83%;
    display: flex;
    flex-direction: column;
`;

export const StyledHead = styled.h3`
    font-size: 20px;
    margin: 0;
    color: #000;
    font-size: 36px;
`;

export const StyledDescription = styled.p`
    font-size: 22px;
    color: #000;
`;

export const StatusFrame = styled.div`
    display: flex;
    flex-direction: column;
`;

export const StatusText = styled.p`
    font-size: 18px;
    color: #000;
`;
