import React, { useState } from "react";
import Card from "./Card";
import { camelCaseToSentenceCase } from "../utils";
import { animated, useSpring } from "@react-spring/web";
import CardSkeleton from "./CardSkeleton";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../Common/apiConfig";
import {
  addTask,
  setOpenAlert,
  setShowTicket,
} from "../../redux/nonPersistant";
import { TextField, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function BoardList({ status, tasks, loading }) {
  const theme = localStorage.getItem("theme");
  const dispatch = useDispatch();
  const groupedTasks = {};
  tasks.forEach((task) => {
    const { status } = task;
    if (!groupedTasks[status]) {
      groupedTasks[status] = [];
    }
    groupedTasks[status].push(task);
  });
  const [showAddTicket, setShowAddTicket] = useState(false);
  const [title, setTitle] = useState("");
  const current_user = useSelector((state) => state.user.value);
  const selectedProject = useSelector(
    (state) => state.projects.selectedProject
  );
  const styles = useSpring({
    from: {
      opacity: 0,
      transform: "translateY(-10px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
    config: {
      duration: 500,
      delay: 100,
    },
  });

  const handleSubmit = (status) => {
    const ticket = {
      name: title,
      status: status,
      assignee: current_user.id,
      project: selectedProject._id,
    };
    console.log(ticket);
    axios
      .post(`${API_URL}/task`, ticket)
      .then((response) => {
        dispatch(
          setOpenAlert({
            value: true,
            message: "Ticket Created Successfully",
            type: "success",
          })
        );
        dispatch(setShowTicket({ value: false, type: "" }));
        dispatch(addTask(response.data));
        setShowAddTicket(false)
      })
      .catch((error) => {
        dispatch(setOpenAlert({ value: true, message: error, type: "error" }));
      });
  };

  return (
    <animated.div
      style={styles}
      className={`flex flex-col p-3 w-[216px] justify-start overflow-y-auto h-[84vh] my-2 rounded-md ${
        theme === "dark" ? "bg-[#223145]" : "bg-[#eaf2f8]"
      }`}
    >
      <div className="font-semibold text-center">
        <div className="flex justify-between">
          <div className="flex space-x-2 items-start">
            <Tooltip title={camelCaseToSentenceCase(status)}>
              {status.length >= 15
                ? camelCaseToSentenceCase(status.slice(0, 12) + "...")
                : camelCaseToSentenceCase(status)}
            </Tooltip>

            {groupedTasks[status]?.length > 0 && (
              <div className="bg-black/20 rounded-full px-2">
                {groupedTasks[status]?.length}
              </div>
            )}
          </div>

          {showAddTicket ? (
            <button
              onClick={() => setShowAddTicket(false)}
              className="p-2 rounded-md hover:bg-[#a4b7c6] hover:text-[#000] w-5 h-5 flex items-center justify-center cursor-pointer"
            >
              <CloseIcon className="!w-5 !h-5" />
            </button>
          ) : (
            <button
              onClick={() => setShowAddTicket(true)}
              className="p-2 rounded-md hover:bg-[#a4b7c6] hover:text-[#000] w-5 h-5 flex items-center justify-center cursor-pointer"
            >
              <AddIcon className="!w-5 !h-5" />
            </button>
          )}
        </div>
      </div>
      <div className="mt-1">
        <div>
          {showAddTicket && (
            <div className="flex items-center space-x-1">
              <TextField
                size="small"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                type="text"
                className="w-full p-1 border rounded-md bg-transparent focus:outline-none"
                placeholder="Ticket Title"
                variant="outlined"
              />
              <button
                onClick={() => handleSubmit(status)}
                className="p-2 rounded-md hover:bg-[#a4b7c6] hover:text-[#000] w-5 h-5 flex items-center justify-center cursor-pointer"
              >
                <AddIcon className="!w-5 !h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <CardSkeleton />
      ) : (
        <div className="flex flex-col flex-grow overflow-auto">
          {groupedTasks[status]?.length > 0 ? (
            groupedTasks[status].map((task) => (
              <div key={task._id}>
                <Card task={task} />
              </div>
            ))
          ) : (
            <div className="text-sm text-center">No tasks in this section</div>
          )}
        </div>
      )}
    </animated.div>
  );
}

export default BoardList;
