/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";

const FullScreen = styled.div`
  margin: 0;
  padding: 0;
  display: flex;

  flex-flow: column nowrap;
  gap: 1rem;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  ${({ blur }) => {
    if (blur)
      return css`
        backdrop-filter: blur(5px);
      `;
  }}
  ${({ styles }) => styles && css(styles)};
`;
const FlexDiv = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "styles",
})`
  margin: 0;
  padding: 0;
  display: flex;
  flex-flow: column nowrap;
  gap: 0.3rem;
  align-items: center;
  justify-content: center;
  ${({ blur }) => {
    if (blur)
      return css`
        backdrop-filter: blur(5px);
      `;
  }}
  ${({ styles }) => styles && css(styles)};
`;
const Wrapper = ({ full, children, blur, styles, onClick }) => {
  if (full)
    return (
      <FullScreen blur={blur} styles={styles} onClick={onClick}>
        {children}
      </FullScreen>
    );

  return (
    <FlexDiv styles={styles} onClick={onClick}>
      {children}
    </FlexDiv>
  );
};

export default Wrapper;
