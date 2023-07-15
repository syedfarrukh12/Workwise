import React, { useContext, useState } from "react";
import { ThemeContext } from "../../ThemeContext";
import Switch from "@mui/material/Switch";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { NavLink, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch } from "react-redux";
import { resetStore } from "../../redux/store";
import LogoutIcon from "@mui/icons-material/Logout";

function Navbar({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [currentTheme, setCurrentTheme] = useState(theme);

  const handleThemeToggle = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setCurrentTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    toggleTheme(newTheme);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();

  const handleLogout = () => {
    const theme = localStorage.getItem("theme");
    setIsLoggedIn(false);
    navigate("/login");
    dispatch(resetStore());
    localStorage.clear();
    localStorage.setItem("theme", theme);
  };

  return (
    <>
      <div
        className={`fixed top-0 w-full z-20 text-sm ${
          currentTheme === "dark" ? " bg-[#182536]" : "bg-[#a5b9c9]"
        }`}
      >
        <div className="flex items-center align-middle justify-between flex-row px-5 py-2 shadow-lg z-50">
          <NavLink
            to="/"
            className={`text-xl cursor-pointer ${
              currentTheme === "dark" ? "text-[#DDE6ED]" : "text-[#27374D]"
            }`}
          >
            <code>Workwise</code>
          </NavLink>

          <div className="flex flex-row space-x-4 items-center">
            {/* <NavLink to="/projects" className="cursor-pointer">
              Projects
            </NavLink> */}
            {/* <NavLink to="/" className="cursor-pointer">
              About
            </NavLink> */}
            <div className="items-center hidden sm:flex">
              <LightModeIcon />
              <Switch
                onChange={handleThemeToggle}
                defaultChecked={currentTheme === "dark"}
              />
              <DarkModeIcon />
            </div>
            <button
              className="bg-white/20 px-3 py-2 rounded-full font-semibold flex"
              onClick={handleLogout}
            >
              <LogoutIcon className="!w-5 !h-5" />
              <span className="lg:flex hidden ml-2">Logout</span>
            </button>
            <div>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon
                  className={
                    localStorage.getItem("theme") === "dark"
                      ? "text-white"
                      : "text-black"
                  }
                />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <div className="items-center flex sm:hidden">
                  <MenuItem>
                    <LightModeIcon />
                    <Switch
                      onChange={handleThemeToggle}
                      defaultChecked={currentTheme === "dark"}
                    />
                    <DarkModeIcon />
                  </MenuItem>
                </div>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
