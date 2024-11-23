import styled from "styled-components";

const StyledInput = styled.input`
  border-radius: 0.5rem;
  padding: 0 5px;
  width: 100px;
  border-radius: 0.5rem;
  border: 1px solid white;
  background-color: white;
  color: #252525;

  &::placeholder {
    color: #ffaa00;
  }

  &:focus {
    outline: none;
    background-color: #ffff00;
    color: #3c6aff;
  }
`;

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
