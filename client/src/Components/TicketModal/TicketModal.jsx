import {
  Autocomplete,
  Backdrop,
  Divider,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  setOpenAlert,
  setShowTicket,
  updateSelectedTask,
} from "../../redux/nonPersistant";
import axios from "axios";
import { API_URL } from "../Common/apiConfig";
import { TaskPriority, TaskStatus, camelCaseToSentenceCase } from "../utils";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

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
          assignee: [],
          createdAt: Date.now(),
          createdBy: currentUser._id,
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
    if (!ticket.project) {
      return dispatch(
        setOpenAlert({
          value: true,
          message: "Please Select a project before creating a new ticket",
          type: "error",
        })
      );
    }
    if (!ticket.name || !ticket.priority) {
      return dispatch(
        setOpenAlert({
          value: true,
          message: "Please Select all fields.",
          type: "warning",
        })
      );
    }
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
          dispatch(updateSelectedTask(response.data));
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
          console.log(response);
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
      <Backdrop
        onClick={() => {
          dispatch(setShowTicket({ value: false, type: "" }));
        }}
        open={true}
        style={{ zIndex: 30 }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={`${
            theme === "dark" ? "bg-[#27374D]" : "bg-[#DDE6ED]"
          } md:rounded-2xl lg:w-[40%] md:w-[70%] w-full shadow-2xl`}
        >
          <div className="flex justify-between p-3">
            <span>
              {editCondition ? "Edit Ticket" : "Create Ticket"} for{" "}
              {selectedProject.name}
            </span>
            <button
              onClick={() => {
                dispatch(setShowTicket({ value: false, type: "" }));
              }}
              className="cursor-pointer hover:bg-black/10 w-fit rounded-full ml-auto"
            >
              <CloseIcon className="!w-5 !h-5" />
            </button>
          </div>
          <Divider />
          <div className="flex p-5 flex-col space-y-3 overflow-auto max-h-[450px] lg:max-h-[500px]">
            <span>Ticket Title</span>
            <TextField
              id="outlined-basic"
              className="w-full"
              size="small"
              variant="outlined"
              onChange={handleChange}
              name="name"
              placeholder="Title for ticket"
              value={ticket.name}
            />
            <span>Ticket Description</span>
            <TextField
              id="outlined-basic"
              className="w-full"
              placeholder="Description for Ticket"
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
            <div>
              <span>Due Date</span>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    className="w-full"
                    disablePast
                    value={dayjs(ticket.dueDate)}
                    onChange={(newValue) =>
                      setTicket((prev) => ({
                        ...prev,
                        dueDate: newValue,
                      }))
                    }
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>

            <span>Assignee</span>
            <Autocomplete
              disablePortal
              className="w-full"
              multiple
              name="users"
              size="small"
              id="combo-box-demo"
              onChange={(event, newValue) =>
                setTicket((prev) => ({
                  ...prev,
                  assignee: newValue.map((user) => user._id),
                }))
              }
              options={selectedProject.users}
              getOptionLabel={(user) => user.name}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
          <Divider />
          <div className="p-3 space-x-3 justify-end flex">
            <button
              onClick={() => {
                dispatch(setShowTicket({ value: false, type: "" }));
              }}
              className="bg-red-500 hover:bg-red-700 py-2 px-3 rounded-full text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-sky-600 hover:bg-sky-800 py-2 px-3 rounded-full text-white"
            >
              {editCondition ? "Save" : "Create Ticket"}
            </button>
          </div>
        </div>
      </Backdrop>
    </>
  );
}

export default TicketModal;
