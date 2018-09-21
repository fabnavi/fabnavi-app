import styled, { css } from 'styled-components';

export const NavFrame = styled.div`
    width: 95%;
    padding-top: 5px;
    padding-bottom: 30px;
    height: 80px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const LeftNav = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 120px;
`;

export const Logo = styled.img`
    padding-top: 30px;
    width: 200px;
    height: 80px;

    width: 35%;
    padding: 0px;
    padding-top: 10px;
    margin: 0px;
`;

export const RightNav = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 40px;
`;
