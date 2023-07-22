import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FlagIcon from "@mui/icons-material/Flag";
import { TaskPriority, formatDate, getInitials, lightColors } from "../utils";
import axios from "axios";
import { API_URL } from "../Common/apiConfig";
import { useDispatch, useSelector } from "react-redux";
import {
  setOpenAlert,
  setShowTicket,
  setSelectedTask,
  deleteSelectedTask,
  setShowTask,
} from "../../redux/nonPersistant";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

function TicketCard({ task }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = localStorage.getItem("theme");
  const [visible, setVisible] = useState(task.visible);
  const currentProject = useSelector((state) => state.projects.selectedProject);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteTicket = () => {
    setAnchorEl(null);
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
    setAnchorEl(null);
    dispatch(setSelectedTask(task));
    dispatch(setShowTicket({ value: true, type: "edit" }));
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

  return (
    <>
      <div>
        <div
          className={`rounded-lg w-full h-14 p-3 flex items-center space-y-2 mt-2 shadow-md ${
            theme === "dark" ? "bg-[#27374D]" : "bg-[#DDE6ED]"
          }`}
        >
          <div className="flex items-center w-full">
            <div className="space-x-2 flex items-center cursor-pointer ">
              <Tooltip title={task.priority}>
                <FlagIcon
                  className={`${
                    task.priority === TaskPriority.Low
                      ? "text-[#388E3C]"
                      : task.priority === TaskPriority.Medium
                      ? "text-[#ffcc00]"
                      : task.priority === TaskPriority.High
                      ? "text-[#ff8c00]"
                      : "text-[#FF4500]"
                  }`}
                />
              </Tooltip>
              <div className=" hidden lg:flex items-center h-5">
                {visible ? (
                  <VisibilityIcon onClick={handleUpdateVisibility} />
                ) : (
                  <VisibilityOffIcon onClick={handleUpdateVisibility} />
                )}
                {/* <Checkbox defaultChecked onChange={()=>{setVisible(!visible)}}/> */}
              </div>
              <div
                onClick={() => {
                  dispatch(setShowTask(true));
                  dispatch(setSelectedTask(task));
                }}
              >
                <Tooltip title={task.name}>
                  <div className="font-bold">
                    {task.name.length > 30 && window.innerWidth < 645
                      ? task.name.slice(0, 20) + "..."
                      : task.name}
                  </div>
                </Tooltip>

                {task.dueDate && (
                  <div
                    className={`text-xs ${
                      theme === "dark" ? "text-white/50" : "text-black/50"
                    }`}
                  >
                    Due Date: {formatDate(task.dueDate)}
                  </div>
                )}
              </div>
            </div>

            {task.dueDate && new Date() > new Date(task.dueDate) && (
              <div className="px-1 cursor-default bg-red-600 text-[10px] text-white rounded-md ml-4 shadow-lg  hidden lg:flex">
                overdue
              </div>
            )}
            <div className="flex ml-10">
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

            <div className="ml-auto">
              <div className="flex items-center">
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? "long-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
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
                    <EditIcon className="!h-4 !w-4 mr-2" /> Edit
                  </MenuItem>
                  <MenuItem onClick={handleDeleteTicket}>
                    <DeleteIcon className="!h-4 !w-4 mr-2" /> Delete
                  </MenuItem>
                </Menu>
                <div className="ml-2 cursor-grab hidden lg:flex">
                  <DragIndicatorIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TicketCard;
