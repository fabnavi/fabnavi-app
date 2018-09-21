import styled, { css } from 'styled-components';

export const SearchBarSection = styled.section`
    background-color: white;
    text-align: left;
    margin-left: 105px;
    margin-bottom: 50px;
`;

export const SearchBarLayout = styled.div`
    position: relative;
    margin-right: auto;
    margin-left: auto;
    height: 35px;
    display: block;
`;

export const SearchForm = styled.form`
    right: 0;
    width: 480px;
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
    width: 26px;
    height: 26px;
    margin: 7px 0px 6px 8px;
    transition: 0.1s ease-in-out;

    &:hover {
        opacity: 0.5;
    }
`;
