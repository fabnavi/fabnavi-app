import styled, { css } from 'styled-components';

export const NavigationLayout = styled.nav`
  width: 90%;
  padding-top: 25px;
  padding-bottom: 55px;
  height: 50px;
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
  margin-right: -70px;
`;

export const NavBorder = styled.hr`
  width: 85%;
  border: 0;
  border-bottom: 2px solid #3ba3fe;
  background: #fff;
`;
