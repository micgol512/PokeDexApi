import Switch from "@mui/material/Switch";
import { useContext } from "react";
import { Theme } from "../../../context/Theme";
const ThemeChanger = () => {
  const { toggleTheme } = useContext(Theme);
  return <Switch defaultChecked color="default" onChange={toggleTheme} />;
};

export default ThemeChanger;
