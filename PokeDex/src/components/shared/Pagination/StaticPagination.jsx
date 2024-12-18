/* eslint-disable react/prop-types */
import { Pagination } from "@mui/material";
import styled from "styled-components";
import { PageContext } from "../../../context/PageContext";
import { useContext } from "react";
import { useSearchParams } from "react-router-dom";

const StyledPaginaton = styled(Pagination)(({ theme }) => {});

const StaticPagination = ({ max = 1, page, setPage }) => {
  // const { offset, setPage, setOffset } = useContext(PageContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || 1;
  const handleChange = (_e, value) => {
    setSearchParams({ page: value });
    // setOffset;
    // setOffset((value - 1) * 15);
    setPage(value);
  };
  return (
    <Pagination
      count={max}
      page={Number(currentPage)}
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
