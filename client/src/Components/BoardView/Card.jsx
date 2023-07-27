import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { API_URL } from "../Common/apiConfig";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  deleteSelectedTask,
  setOpenAlert,
  setSelectedTask,
  setShowTask,
  setShowTicket,
} from "../../redux/nonPersistant";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  TaskPriority,
  formatDateToDayMonth,
  getInitials,
  lightColors,
} from "../utils";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";

function Card({ task }) {
  const dispatch = useDispatch();
  const currentProject = useSelector((state) => state.projects.selectedProject);
  const [visible, setVisible] = useState(task.visible);
  const theme = localStorage.getItem("theme");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateVisibility = () => {
    setVisible((prevVisible) => !prevVisible);
    axios
      .put(`${API_URL}/tasks/${currentProject._id}/${task._id}`, {
        visible: !visible,
      })
      .then((response) => {
        console.log(response);
        dispatch(
          setOpenAlert({
            value: true,
            message: `Ticket visibility set to ${
              visible ? "Hidden" : "Visible"
            }`,
            type: "success",
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteTicket = () => {
    axios
      .delete(`${API_URL}/tasks/${currentProject._id}/${task._id}`)
      .then((response) => {
        dispatch(
          setOpenAlert({
            value: true,
            message: response.data,
            type: "success",
          })
        );
        dispatch(deleteSelectedTask(task._id));
      });
  };

  const handleUpdateTicket = () => {
    dispatch(setSelectedTask(task));
    dispatch(setShowTicket({ value: true, type: "edit" }));
  };

  return (
    <div
      className={`rounded-lg flex w-48 mt-2 ${
        theme === "dark" ? "bg-[#27374D]" : "bg-[#DDE6ED]"
      }`}
    >
      <Tooltip title={task.priority}>
        <div
          className={`w-[5px] rounded-l-full justify-center items-center align-middle ${
            task.priority === TaskPriority.Low
              ? "bg-[#388E3C]"
              : task.priority === TaskPriority.Medium
              ? "bg-[#ffcc00]"
              : task.priority === TaskPriority.High
              ? "bg-[#ff8c00]"
              : "bg-[#FF4500]"
          }`}
        ></div>
      </Tooltip>

      <div className="flex flex-col p-3 justify-between hover:shadow-lg space-y-5">
        {/* Top section */}
        <div className="flex-grow">
          <div
            onClick={() => {
              dispatch(setShowTask(true));
              dispatch(setSelectedTask(task));
            }}
            className="font-semibold overflow-hidden cursor-pointer"
          >
            {task.name.slice(0, 70)}
          </div>
          <Tooltip title={`This ticket is overdue`}>
            {task.dueDate &&
              new Date() > new Date(task.dueDate) &&
              task.status !== "completed" && (
                <div className="px-1 mt-1 cursor-default bg-red-600 text-[10px] w-fit text-white rounded-md shadow-lg  hidden lg:flex font-semibold">
                  Due: {formatDateToDayMonth(new Date(task.dueDate))}
                </div>
              )}
          </Tooltip>
          <div className="hidden md:flex mt-5">
            {task.assignee.length > 0 &&
              task.assignee.map((item, index) => (
                <div className="w-fit" key={index}>
                  <Tooltip title={item.name}>
                    <span
                      style={{
                        borderRadius: "500px",
                        backgroundColor: lightColors[index],
                      }}
                      className={`p-2 rounded-ful text-gray-800 cursor-default ${
                        index > 0 ? "-ml-2" : ""
                      }`}
                    >
                      {getInitials(item.name)}
                    </span>
                  </Tooltip>
                </div>
              ))}
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex items-center justify-between">
          <div className="p-1 cursor-pointer hover:bg-white/50 rounded-full">
            {visible ? (
              <VisibilityIcon onClick={handleUpdateVisibility} />
            ) : (
              <VisibilityOffIcon onClick={handleUpdateVisibility} />
            )}
          </div>

          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon className="!w-4 !h-4" />
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
            <MenuItem onClick={handleUpdateTicket}>
              <ListItemIcon>
                <EditIcon className="!h-5 !w-5" />
              </ListItemIcon>
              <ListItemText>Edit</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleDeleteTicket}>
              <ListItemIcon>
                <DeleteIcon className="!h-5 !w-5" />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default Card;
