import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { TextField, Backdrop, Divider } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../Common/apiConfig";
import { setShowCreateProject } from "../../redux/project";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function CreateProject() {
  const dispatch = useDispatch();
  const theme = localStorage.getItem("theme");
  const user = useSelector((state) => state.user.value);
  const [project, setProject] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    createdAt: Date.now(),
    createdBy: user?.id,
    users: [user?.id],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log(project);
    axios
      .post(`${API_URL}/project`, project)
      .then(() => {
        dispatch(setShowCreateProject(false));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClose = () => {
    dispatch(setShowCreateProject(false));
  };

  return (
    <Backdrop onClick={handleClose} open={true} style={{ zIndex: 30 }}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`${
          theme === "dark" ? "bg-[#27374D]" : "bg-[#DDE6ED]"
        } md:rounded-2xl lg:w-[40%] md:w-[70%] w-full shadow-2xl`}
      >
        <div className="flex justify-between p-3">
          <span>Create Project</span>
          <button onClick={handleClose} className="cursor-pointer hover:bg-black/10 w-fit rounded-full ml-auto">
            <CloseIcon className="!w-5 !h-5"/>
          </button>
        </div>
        <Divider />
        <div className="flex p-5 flex-col space-y-3 overflow-auto">
          <span>Project Title</span>
          <TextField
            id="outlined-basic"
            className="w-full"
            size="small"
            variant="outlined"
            name="name"
            placeholder="Name for project"
            value={project.name}
            onChange={handleChange}
          />
          <span>Project Description</span>
          <TextField
            id="outlined-basic"
            className="w-full"
            placeholder="Description for project"
            size="small"
            variant="outlined"
            multiline
            name="description"
            rows={4}
            value={project.description}
            onChange={handleChange}
          />
          <div>
            <span>Start Date</span>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  name="startDate"
                  onChange={(date) => handleChange({ target: { value: date } })}
                  className="w-full"
                  label="Start date"
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div>
            <span>End Date</span>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  name="endDate"
                  // value={ticket.dueDate}
                  onChange={(date) => handleChange({ target: { value: date } })}
                  className="w-full"
                  label="End date"
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </div>
        <Divider />
        <div className="p-3 space-x-3 justify-end flex">
          <button
            onClick={handleClose}
            className="bg-red-500 hover:bg-red-700 p-2 rounded-lg text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-sky-600 hover:bg-sky-800 p-2 rounded-lg text-white"
          >
            Create Project
          </button>
        </div>
      </div>
    </Backdrop>
  );
}

export default CreateProject;
