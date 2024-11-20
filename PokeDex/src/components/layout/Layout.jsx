/* eslint-disable react/prop-types */
import Wrapper from "../shared/Wrapper";
import { Header } from "../subpages/index";

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      {children}
    </Wrapper>
  );
};

export default Layout;
