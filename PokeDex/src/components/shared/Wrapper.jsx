/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";

const FullScreen = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 1rem;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  ${({ blur }) => {
    if (blur)
      return css`
        backdrop-filter: blur(5px);
      `;
  }}
  ${({ styles }) => styles && css(styles)};
`;
const FlexDiv = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  ${({ styles }) => styles && css(styles)};
`;
const Wrapper = ({ full, children, blur, styles }) => {
  if (full)
    return (
      <FullScreen blur={blur} styles={styles}>
        {children}
      </FullScreen>
    );

  return <FlexDiv styles={styles}>{children}</FlexDiv>;
};

export default Wrapper;
