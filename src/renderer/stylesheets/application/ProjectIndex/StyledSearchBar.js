import styled, { css } from 'styled-components';

export const SearchBarSection = styled.section`
    background-color: white;
    margin-bottom: 53px;
`;

export const SearchBarLayout = styled.div`
    position: relative;
    margin-right: auto;
    margin-left: auto;
    height: 50px;
    display: block;
`;

export const SearchForm = styled.form`
    right: 0;
    width: 640px;
    height: 50px;
    background-color: white;
    border-radius: 4px;
    box-shadow: none;
    border: solid 1px;
    color: #cecece;
`;

export const SearchInput = styled.input`
    box-shadow: none;
    line-height: 50px;
    background: none;
    padding-left: 10px;
    border: none;
    width: 90%;
    font-family: Helvetica, Arial, '游ゴシック', 'Yu Gothic', '游ゴシック体', YuGothic, sans-serif;
    font-size: 24px;
    font-weight: 700;
    float: left;
    font-style: none;
    color: #262626;
`;

export const SearchIcon = styled.img`
    width: 30px;
    height: 30px;
    margin: 10px;
    transition: 0.1s ease-in-out;

    &:hover {
        opacity: 0.5;
    }
`;
