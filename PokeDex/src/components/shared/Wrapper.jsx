import styled, { css } from "styled-components";

const FullScreen = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  ${({ blur }) => {
    console.log("blur:", blur);
    if (blur)
      return css`
        backdrop-filter: blur(5px);
      `;
  }}
`;
const Wrapper = ({ full, children, blur }) => {
  if (full) return <FullScreen blur={blur}>{children}</FullScreen>;

  return <div>{children}</div>;
};

export default Wrapper;
