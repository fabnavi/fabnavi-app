import styled from 'styled-components';

export const Title = styled.div`
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
    text-transform: capitalize;
`;

export const StyledThumbnailList = styled.ul`
    overflow-x: hidden;
    overflow-y: scroll;
    list-style: none;
    height: 505px;
    width: 220px;
    padding: 0;
    margin: 0;
    background: rgba(255, 255, 255, 0.8);
`;

export const Root = styled.div`
    display: table-cell;
    vertical-align: top;
    padding: 0;
    padding-left: 20px;
`;
