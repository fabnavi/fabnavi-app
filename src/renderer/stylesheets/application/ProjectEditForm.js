import styled, { css } from 'styled-components';

export const EditPage = styled.div`
    clear: both;
    content: '';
    display: block;
    margin-right: auto;
    margin-left: auto;
    width: 1620px;
    padding-top: 60px;
`;

export const EditCaption = styled.div`
    display: flex;
`;

export const EditTarget = styled.p`
    background-color: #c4c4c4;
    color: black;
    font-size: 20px;
    margin-bottom: 10px;
`;

export const InputBox = styled.input`
    padding: 0;
    margin: 0;
`;

export const SaveButton = styled.button`
    float: right;
    width: 140px;
    height: 40px;
    font-size: 12px;
    padding: 10px 30px;
    background-color: gray;
    border-radius: 3px;
    color: #fff;
    border-style: none;

    &:hover {
        background-color: #40e0d0;
        color: #fff;
    }
`;
