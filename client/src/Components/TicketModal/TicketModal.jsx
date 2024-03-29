import { FormControl, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  setOpenAlert,
  setShowTicket,
} from "../../redux/nonPersistant";
import axios from "axios";
import { API_URL } from "../Common/apiConfig";
import { TaskPriority, TaskStatus, camelCaseToSentenceCase } from "../utils";

function TicketModal() {
  const dispatch = useDispatch();
  const theme = localStorage.getItem("theme");
  const selectedProject = useSelector(
    (state) => state.projects.selectedProject
  );
  const currentProject = useSelector((state) => state.projects.selectedProject);
  const currentUser = useSelector((state) => state.user.value);
  const selectedTask = useSelector((state) => state.nonPersistant.selectedTask);
  const showTicketModal = useSelector(
    (state) => state.nonPersistant.showTicket
  );
  const editCondition = showTicketModal.type === "edit";
  const [ticket, setTicket] = useState(
    editCondition
      ? {
          name: selectedTask.name,
          description: selectedTask.description,
          status: selectedTask.status,
          priority: selectedTask.priority,
          project: selectedTask.project,
          dueDate: selectedTask.dueDate,
          assignee: selectedTask.assignee,
          createdAt: selectedTask.createdAt,
          createdBy: selectedTask.createdBy,
        }
      : {
          name: "",
          description: "",
          status: "new",
          priority: "",
          project: currentProject._id,
          dueDate: "",
          assignee: "",
          createdAt: Date.now(),
          createdBy: currentUser.id,
        }
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTicket((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log(ticket);
    if (editCondition)
      axios
        .put(
          `${API_URL}/tasks/${currentProject._id}/${selectedTask._id}`,
          ticket
        )
        .then((response) => {
          dispatch(
            setOpenAlert({
              value: true,
              message: "Ticket Updated Successfully",
              type: "success",
            })
          );
          dispatch(setShowTicket({ value: false, type: "" }));
          dispatch(addTask(response.data));
        })
        .catch((error) => {
          dispatch(
            setOpenAlert({ value: true, message: error, type: "error" })
          );
        });
    else
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
        })
        .catch((error) => {
          dispatch(
            setOpenAlert({ value: true, message: error, type: "error" })
          );
        });
  };
  return (
    <>
      <div className="flex justify-center lg:justify-start items-center h-screen w-screen bg-gray-500/50 fixed z-10 p-2">
        <div
          className={`${
            theme === "dark" ? "bg-[#27374D]" : "bg-white"
          } md:rounded-2xl lg:w-[40%] md:w-[70%] w-full lg:ml-80 mt-[-60px] shadow-2xl`}
        >
          <div className="flex justify-between p-3 border-b">
            <span>
              {editCondition ? "Edit Ticket" : "Create Ticket"} for{" "}
              {selectedProject.name}
            </span>
            <button
              onClick={() => {
                dispatch(setShowTicket({ value: false, type: "" }));
              }}
              className="bg-none"
            >
              <CloseIcon />
            </button>
          </div>
          <div className="flex p-5 flex-col space-y-3 border-b overflow-auto">
            <span>Ticket Title</span>
            <TextField
              id="outlined-basic"
              className="w-full"
              size="small"
              variant="outlined"
              onChange={handleChange}
              name="name"
              placeholder="Name for project"
              value={ticket.name}
            />
            <span>Ticket Description</span>
            <TextField
              id="outlined-basic"
              className="w-full"
              placeholder="Description for project"
              size="small"
              variant="outlined"
              multiline
              name="description"
              onChange={handleChange}
              rows={4}
              value={ticket.description}
            />
            <span>Priorty</span>
            <FormControl>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                placeholder="Select Assignees"
                size="small"
                name="priority"
                value={ticket.priority}
                onChange={handleChange}
              >
                {Object.values(TaskPriority).map((priority) => (
                  <MenuItem value={priority}>
                    {camelCaseToSentenceCase(priority)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {editCondition && (
              <>
                <span>Status</span>
                <FormControl>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    placeholder="Select Assignees"
                    size="small"
                    name="status"
                    onChange={handleChange}
                    value={ticket.status}
                  >
                    {Object.values(TaskStatus).map((status) => (
                      <MenuItem value={status}>
                        {camelCaseToSentenceCase(status)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </>
            )}
            <span>Due Date</span>
            <TextField
              id="outlined-basic"
              className="w-full"
              size="small"
              variant="outlined"
              onChange={handleChange}
              type="date"
              name="dueDate"
              value={ticket.dueDate}
            />
            <span>Assignee</span>
            <FormControl>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                placeholder="Select Assignees"
                onChange={handleChange}
                size="small"
                name="assignee"
              >
                <MenuItem value={currentUser.id}>Ali</MenuItem>
                <MenuItem value={currentUser.id}>Ahmad</MenuItem>
                <MenuItem value={currentUser.id}>Murtaza</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="p-3 space-x-3 justify-end flex">
            <button
              onClick={() => {
                dispatch(setShowTicket({ value: false, type: "" }));
              }}
              className="bg-red-500 hover:bg-red-700 p-2 rounded-lg text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-sky-600 hover:bg-sky-800 p-2 rounded-lg text-white"
            >
              {editCondition ? "Save" : "Create Ticket"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TicketModal;
