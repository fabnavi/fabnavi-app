import styled, { css } from 'styled-components';

export const SearchBarSection = styled.section`
    background-color: white;
    padding-bottom: 30px;
    padding-top: 30px;
    text-align: left;
    margin-left: -120px;
`;

export const SearchBarLayout = styled.div`
    position: relative;
    margin-right: auto;
    margin-left: auto;
    padding-top: 5px;
    height: 28px;
    display: block;
`;

export const SearchForm = styled.form`
    right: 0;
    width: 400px;
    height: 40px;
    background-color: white;
    border-radius: 4px;
    box-shadow: none;
    border: solid 1px;
    color: #cecece;
`;

export const SearchInput = styled.input`
    box-shadow: none;
    line-height: 40px;
    background: none;
    border: none;
    width: 90%;
    font-size: 12pt;
    float: left;
    font-style: none;
    color: #262626;
`;

export const SearchIcon = styled.img`
    width: 24px;
    height: 24px;
    margin: 10px 0 0 0;

    &:hover {
        cursor: pointer;
        border: 1px dashed black;
    }
`;