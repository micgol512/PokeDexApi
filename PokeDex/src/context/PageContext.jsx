import { createContext, useState } from "react";

const PageContext = createContext(0);
// eslint-disable-next-line react/prop-types
const PageProvider = ({ children }) => {
  const [offset, setOffset] = useState(25);
  // ofset 0-14 page 1
  // ofset 15-29 page 2
  // ofset 30-44 page 3
  const setPage = (page) => {
    setOffset((page - 1) * 15);
  };

  return (
    <PageContext.Provider value={{ offset, setPage }}>{children}</PageContext.Provider>
  );
};
export { PageContext, PageProvider };
