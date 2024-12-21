/* eslint-disable react/prop-types */
import { Pagination } from "@mui/material";
import styled, { css } from "styled-components";
import { useSearchParams } from "react-router-dom";

// const StyledPagination = styled(Pagination)`
//   .MuiPaginationItem-root {
//     color: black; /* Kolor tekstu */
//     border-radius: 50%; /* Zaokrąglenie */
//     &:hover {
//       background-color: ${({ theme }) =>
//         theme.colors.hover}; /* Kolor tła po najechaniu */
//     }
//   }
//    .Mui-selected {
//     background: yellow;
//     color: white;
//     font-weight: bold;
//     &:hover: background: yellow;
//   }
//   .MuiPaginationItem-icon {
//     color: red;
//   }
// `;

const StaticPagination = ({ max = 1 }) => {
  // const { offset, setPage, setOffset } = useContext(PageContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || 1;
  const handleChange = (_e, value) => {
    setSearchParams({ page: value });
    // setOffset;
    // setOffset((value - 1) * 15);
    // setPage(value);
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
