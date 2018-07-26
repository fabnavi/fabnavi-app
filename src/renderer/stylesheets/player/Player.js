import styled from 'styled-components';

export const ImagePlayer = styled.canvas`
    display: table-cell;
    width: 100%;
    height: 100%;
`;

export const VideoPanel = styled.video`
    &::-webkit-media-controls-panel {
        display: flex !important;
        opacity: 1 !important;
    }
`;
