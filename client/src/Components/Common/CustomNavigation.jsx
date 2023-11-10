import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { setShowBoardView } from "../../redux/project";

function CustomNavigation({ setQuery, query }) {
  const theme = localStorage.getItem("theme");
  const dispatch = useDispatch();

  const iconStyle = "!w-5 !h-5";
  return (
    <>
      <div
        className={`flex w-full px-3 py-2 ${
          theme === "dark" ? "bg-[#27374D]" : "bg-[#DDE6ED]"
        } shadow-md `}
      >
        <div className="hidden lg:flex">
          <div
            onClick={() => {

              dispatch(setShowBoardView(true));
            }}
            className="flex flex-col justify-center items-center cursor-pointer w-fit"
          >
            <div
              className={`${
                theme === "dark" ? "bg-[#182536]" : "bg-[#a5b9c9]"
              } p-2 rounded-md `}
            >
              <DashboardIcon className={iconStyle} />
            </div>
            <small className="text-xs">Board</small>
          </div>
          <div
            onClick={() => {
              dispatch(setShowBoardView(false))
            }}
            className="flex flex-col justify-center items-center cursor-pointer w-fit ml-2"
          >
            <div
              className={`${
                theme === "dark" ? "bg-[#182536]" : "bg-[#a5b9c9]"
              } p-2 rounded-md `}
            >
              <FormatListBulletedIcon className={iconStyle} />
            </div>
            <small className="text-xs">List</small>
          </div>
        </div>

        <div className="ml-auto w-full sm:w-fit">
          <TextField
            id="outlined-basic"
            className="w-full !mt-[2px]"
            size="small"
            variant="outlined"
            value={query}
            name="name"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title"
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
