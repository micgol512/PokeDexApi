import { createContext, useState } from "react";

const PageContext = createContext(0);
// eslint-disable-next-line react/prop-types
const PageProvider = ({ children }) => {
  const [offset, setOffset] = useState(0);
  const setPage = (page) => {
    setOffset((page - 1) * 15);
  };
  const getPage = () => Math.ceil(offset / 15) + 1;
  return (
    <PageContext.Provider value={{ offset, setPage, getPage, setOffset }}>
      {children}
    </PageContext.Provider>
  );
};
export { PageContext, PageProvider };
