import styled from 'styled-components';

export const StyledThumbnail = styled.li`
    position: relative;
    margin: 0 0 10px;
    width: ${props => props.size === 'small' ? '144px' : '224px'};
`;

export const Image = styled.img`
    width: ${props => props.size === 'small' ? '144px' : '224px'};
    height: auto;
    margin: 0;
    cursor: pointer;
    opacity: ${props => props.willBeDeleted ? '0.3' : '1.0'};
`;

export const Index = styled.p`
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    padding-top: 5px;
    padding-left: 10px;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.6);
    color: black;
`;

export const StyledDeleteButton = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    padding-top: 5px;
    padding-left: 10px;
    width: 20px;
    height: 20px;
    line-height 18px;
    background: rgba(255, 255, 255, 0.6);
    color: black;
    cursor: pointer;
    &:hover {
        background: black;
        color: white;
    }
`;
