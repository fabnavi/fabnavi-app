import styled from 'styled-components';

export const StyledThumbnailList = styled.ul`
    overflow-x: hidden;
    overflow-y: scroll;
    list-style: none;
    height: ${props => (props.contentType === 'movie' || props.size === 'small') ? '400px' : '460px'};
    width: ${props => props.size === 'small' ? '164px' : '244px'};
    padding: 0;
    margin: 0;
    background: rgba(255, 255, 255, 0.8);
`;
