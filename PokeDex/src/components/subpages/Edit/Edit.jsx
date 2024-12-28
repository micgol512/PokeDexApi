import { Outlet, useNavigate } from "react-router-dom";
import Wrapper from "../../shared/Wrapper";
import EditAddForm from "./EditAddForm";
import StylButton from "../../shared/StylButton";

const Register = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <h3>Add new/Edit pokemon</h3>
      <Wrapper styles={{ flexDirection: "row" }}>
        <StylButton onClick={() => navigate("/edit/add")}>Add new</StylButton>
        <StylButton onClick={() => navigate("/edit/list")}>
          Edit existing
        </StylButton>
      </Wrapper>
      <Outlet />
    </Wrapper>
  );
};

export default Register;
