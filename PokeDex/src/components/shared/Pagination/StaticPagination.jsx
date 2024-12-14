import { Pagination } from "@mui/material";
import styled from "styled-components";
import { PageContext } from "../../../context/PageContext";
import { useContext } from "react";

const StyledPaginaton = styled(Pagination)(({ theme }) => {});
const StaticPagination = () => {
  const { offset, setPage, setOffset } = useContext(PageContext);
  const handleChange = (_e, value) => {
    // setOffset;
    setOffset((value - 1) * 15);
    // setPage(value);
  };
  const getPage = () => Math.ceil(offset / 15) + 1;
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
