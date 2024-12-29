/* eslint-disable react/prop-types */
import styled from "styled-components";
import { Header } from "../subpages/index";
const RootWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  gap: 10px;
  background: ${({ theme }) => theme.colors.border};
`;
const HeaderWrapper = styled.div`
  padding: 10px 0;
  display: flex;
  flex-flow: row nowrap;
  background: red;
  width: 100%;
  height: auto;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
`;
const MainWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.bg};

  height: 100%;
  padding: 10px;
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  // justify-content: center;
  align-items: center;
  padding-top: 10px;
`;

const Layout = ({ children }) => {
  return (
    <RootWrapper>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <MainWrapper> {children}</MainWrapper>
    </RootWrapper>
  );
};

export default Layout;
