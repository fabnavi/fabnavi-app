import styled from 'styled-components';

export const Title = styled.div`
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 10px;
`;

export const ThumbnailStyle = styled.li`
    position: relative;
    margin: 0 0 10px;
    width: 200px;
`;

export const ThumbnailImage = styled.img`
    width: 200px;
    height: auto;
    margin: 0;
    cursor: pointer;
`;

export const ThumbnailNum = styled.p`
    margin: 0;
    padding-left: 10px;
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.6);
    color: black;
`;

export const ThumbnailList = styled.ul`
    overflow-x: hidden;
    overflow-y: scroll;
    list-style: none;
    height: 718px;
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
