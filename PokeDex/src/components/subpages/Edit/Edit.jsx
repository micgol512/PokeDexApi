import { Outlet, useNavigate } from "react-router-dom";
import Wrapper from "../../shared/Wrapper";
import StyledButton from "../../shared/StyledButton";

const Register = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <h3>Add new/Edit pokemon</h3>
      <Wrapper styles={{ flexDirection: "row" }}>
        <StyledButton onClick={() => navigate("/edit/add")}>
          Add new
        </StyledButton>
        <StyledButton onClick={() => navigate("/edit/list")}>
          Edit existing
        </StyledButton>
      </Wrapper>
      <Outlet />
    </Wrapper>
  );
};

export default Register;
