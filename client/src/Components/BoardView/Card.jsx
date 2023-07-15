import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { API_URL } from "../Common/apiConfig";
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
import FlagIcon from "@mui/icons-material/Flag";
import { TaskPriority } from "../utils";

function Card({ task }) {
  const dispatch = useDispatch();
  const currentProject = useSelector((state) => state.projects.selectedProject);
  const [visible, setVisible] = useState(task.visible);
  const theme = localStorage.getItem("theme");
  const [isHovered, setIsHovered] = useState(false);

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
    <>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`flex flex-col rounded-lg w-48 h-52 cursor-pointer border border-[#a4b7c6] p-3 mt-2 ${
          theme === "dark" ? "bg-[#27374D]" : "bg-[#DDE6ED]"
        }`}
      >
        <div className="border-b border-[#a4b7c6] flex-grow">
          <div
            onClick={() => {
              dispatch(setShowTask(true));
              dispatch(setSelectedTask(task));
            }}
            className="font-semibold h-[120px] max-h-[150px] overflow-hidden"
          >
            {task.name}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="!mt-2">
            {visible ? (
              <VisibilityIcon onClick={handleUpdateVisibility} />
            ) : (
              <VisibilityOffIcon onClick={handleUpdateVisibility} />
            )}
          </div>
          <FlagIcon
            className={`${
              task.priority === TaskPriority.Low
                ? "text-[#388E3C]"
                : task.priority === TaskPriority.Medium
                ? "text-[#FFEB3B]"
                : task.priority === TaskPriority.High
                ? "text-[#FF9800]"
                : "text-[#F44336]"
            }`}
          />
        </div>
        <div
          className={`flex justify-end gap-1  ${
            isHovered ? "visible" : "hidden"
          }`}
        >
          <div
            onClick={handleDeleteTicket}
            className="p-2 rounded-full hover:bg-black/30 w-6 h-6 flex items-center justify-center cursor-pointer"
          >
            <DeleteIcon className="!h-5 !w-5" />
          </div>
          <div
            onClick={handleUpdateTicket}
            className="p-2 rounded-full hover:bg-black/30 w-6 h-6 flex items-center justify-center cursor-pointer"
          >
            <EditIcon className="!h-5 !w-5" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
