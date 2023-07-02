import React, { useContext, useState } from "react";
import { ThemeContext } from "../../ThemeContext";
import Switch from "@mui/material/Switch";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { NavLink } from "react-router-dom";

function Navbar() {
  const { theme, toggleTheme } = useContext<any>(ThemeContext);
  const [currentTheme, setCurrentTheme] = useState(theme);

  const handleThemeToggle = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setCurrentTheme(newTheme);
    localStorage.setItem('theme', newTheme)
    toggleTheme(newTheme);
  };

  return (
    <>
      <div>
        <div
          className="flex align-middle justify-between flex-row px-5 py-2 shadow-lg"
          style={{ backgroundColor: "rgba(1,1,1,0.3)" }}
        >
          <div
            className={`text-xl ${
              currentTheme === "dark" ? "text-sky-400" : "text-sky-900"
            }`}
          >
            <code>Workwise</code>
          </div>
          <div className="flex flex-row space-x-4 items-center">
            <NavLink to="/" className="cursor-pointer">Home</NavLink>
            <NavLink to="/projects" className="cursor-pointer">Projects</NavLink>
            <NavLink to="/" className="cursor-pointer">About</NavLink>
            <div className="flex items-center">
              <LightModeIcon />
              <Switch
                onChange={handleThemeToggle}
                defaultChecked={currentTheme === "dark"}
              />
              <DarkModeIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
