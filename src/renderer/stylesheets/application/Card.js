import styled, { css } from 'styled-components';

export const ProjectFrame = styled.div`
    margin: 10px 20px 20px;
    position: relative;
    width: 250px;
    height: 300px;
    transition: 0.1s ease-in-out;

    &:hover {
        box-shadow: 0 0 0 3px #ff0000;
        border-radius: 7px 7px 7px 7px;
    }

    ${props =>
        props.selected ?
            css`
                  box-shadow: 0 0 0 3px #ff0000;
                  border-radius: 7px 7px 7px 7px;
              ` :
            css`
                  box-shadow: 6px 6px 2px #ddd;
                  border-radius: 7px 7px 7px 7px;
              `};
`;

export const ProjectThumbnail = styled.div`
    width: 250px;
    height: 140px;
    margin: 0 auto;
    overflow: hidden;

    img {
        width: 100%;
        border-radius: 7px 7px 0 0;
    }
`;

export const ProjectTitle = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const ProjectName = styled.h3`
    width: 160px;
    height: 40px;
    margin: 0px;
    padding: 0px;
    font-size: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-top: 13px;
    margin-left: 10px;
    margin-bottom: -5px;
`;

export const ProjectIcon = styled.img`
    width: 30px;
    height: 30px;

    ${props =>
        props.user ?
            css`
                  border-radius: 100%;
                  margin-top: 5px;
              ` :
            css`
                  margin-left: 10px;
              `};
`;

export const CardBorder = styled.hr`
    border: 0;
    border-bottom: 1px solid #5d5d5d;
    background: #fff;
    width: 90%;
`;

export const ProjectBox = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ProjectDescription = styled.h5`
    font-size: 14px;
    color: #707070;
    word-break: break-all;
    margin: 0px;
    margin-top: 10px;
    margin-left: 20px;
`;

export const ProjectMenu = styled.div`
    position: absolute;
    width: 250px;
    top: 0;
`;

export const MenuColmun = styled.div`
    background-color: rgba(125, 125, 125, 0.5);
    &:hover {
        background-color: rgba(60, 60, 60, 0.5);
    }
    &:first-child {
        border-radius: 7px 7px 0 0;
    }
`;
