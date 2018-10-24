import styled from 'styled-components';
import { colors } from '../../common/colors';

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
    box-sizing: border-box;
    border: ${props => props.isSelected ? `3px solid ${colors.button.green}` : 'none'};
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

export const StyledDownloadButton = styled.img`
    position: absolute;
    top: 0;
    right: 0;
    margin: 5px;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    background: white;
    cursor: pointer;
    &:hover {
        filter: invert(100%);
    }
`;
