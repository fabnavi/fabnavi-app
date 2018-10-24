import styled, { css } from 'styled-components';

export const StyledCaptionList = styled.div`
    padding-top: 40px;
    border-top: 3px solid #707070;
    border-bottom: 3px solid #707070;
`

export const StyledList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0
`;

export const StyledDownloadButton = styled.img`
    vertical-align: bottom;
    margin-left: 10px;
    width: 36px;
    height: 36px;
    border-radius: 36px;
    background: white;
    cursor: pointer;
    &:hover {
        opacity: 0.6;
    }
`;
