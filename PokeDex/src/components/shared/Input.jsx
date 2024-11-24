import styled from "styled-components";

const StyledInput = styled.input`
  border-radius: 0.5rem;
  padding: 0 5px;
  width: 100px;
  border-radius: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.bg};
  color: ${(props) => props.theme.colors.color};

  &::placeholder {
    color: ${(props) => props.theme.colors.placeholder};
  }

  &:focus {
    outline: none;
    background-color: ${(props) => props.theme.colors.focusBg};
    color: ${(props) => props.theme.colors.focusColor};
  }
  // &:hover {
  //   background-color: ${(props) => props.theme.colors.hoverBg};
  //   color: ${(props) => props.theme.colors.hoverColor};
  // }
`;
StyledInput.defaultProps = {
  theme: {},
};
// eslint-disable-next-line react/prop-types
const Input = ({ type = "text", value, onChange, placeholder }) => {
  return (
    <StyledInput
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Input;
