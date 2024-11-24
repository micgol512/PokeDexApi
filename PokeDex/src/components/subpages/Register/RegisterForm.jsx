import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  gap: 5px;
  width: 200px;
`;

const RegisterForm = () => {
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <StyledForm onSubmit={onSubmit}>
      <label>
        Surname:
        <input type={"text"} placeholder="Username" />{" "}
      </label>
      <label>
        Password:
        <input type={"password"} placeholder="Password" />{" "}
      </label>
      <label>
        Repeat password:
        <input type={"password"} placeholder="Repeat password" />{" "}
      </label>
      <label>
        E-mail:
        <input type={"mail"} placeholder="E-mail" />
      </label>
      <button type="submit">Sing In</button>
    </StyledForm>
  );
};

export default RegisterForm;
