import Switch from "@mui/material/Switch";
import { useContext } from "react";
import { Theme } from "../../../context";
const ThemeChanger = () => {
  const { toggleTheme } = useContext(Theme);
  return <Switch defaultChecked color="default" onChange={toggleTheme} />;
};

export default ThemeChanger;
