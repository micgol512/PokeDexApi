/* eslint-disable react/prop-types */
import { Pagination } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import useSyncData from "../../hooks/useSyncData";

const StaticPagination = ({ max = 1 }) => {
  const { syncData } = useSyncData();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || 1;
  const handleChange = (_e, value) => {
    const newPage = value;
    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);
      params.set("page", newPage);
      return params;
    });
    syncData();
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
      sx={{ margin: " 1rem 0" }}
    />
  );
};
export default StaticPagination;
