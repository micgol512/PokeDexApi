import { Pagination } from "@mui/material";
import styled from "styled-components";
import { PageContext } from "../../../context/PageContext";
import { useContext } from "react";

const StyledPaginaton = styled(Pagination)(({ theme }) => {});
const StaticPagination = () => {
  const { getPage, setPage } = useContext(PageContext);
  const handleChange = (_e, value) => {
    setPage(value);
  };

  return (
    <Pagination
      count={10}
      page={getPage()}
      showFirstButton
      showLastButton
      variant="outlined"
      shape="circular"
      onChange={handleChange}
    />
    // <StyledPaginaton count={10} page={getPage()} onChange={handleChange} />
  );
};
export default StaticPagination;
