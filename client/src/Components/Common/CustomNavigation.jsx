import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function CustomNavigation() {
  const theme = localStorage.getItem("theme");

  const iconStyle = "!w-5 !h-5";
  return (
    <>
      <div
        className={`flex w-full px-3 py-2 ${
          theme === "dark" ? "bg-[#27374D]" : "bg-[#DDE6ED]"
        } shadow-md`}
      >
        <div className="flex flex-col justify-center items-center cursor-pointer w-fit">
          <div
            className={`${
              theme === "dark" ? "bg-[#182536]" : "bg-[#a5b9c9]"
            } p-2 rounded-md `}
          >
            <DashboardIcon className={iconStyle} />
          </div>
          <small className="text-xs">Board</small>
        </div>
        <div className="flex flex-col justify-center items-center cursor-pointer w-fit ml-2">
          <div
            className={`${
              theme === "dark" ? "bg-[#182536]" : "bg-[#a5b9c9]"
            } p-2 rounded-md `}
          >
            <FormatListBulletedIcon className={iconStyle} />
          </div>
          <small className="text-xs">List</small>
        </div>
        <div className="ml-auto">
          <TextField
            id="outlined-basic"
            className="w-full !mt-[2px]"
            size="small"
            variant="outlined"
            name="name"
            placeholder="Search"
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
          />
        </div>
      </div>
    </>
  );
}

export default CustomNavigation;
