import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../Common/apiConfig";
import { setShowCreateProject } from "../../redux/project";

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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    axios
      .post(`${API_URL}/project`, project)
      .then(() => {
        dispatch(setShowCreateProject(false));
      })
      .catch((error) => {
        console.log(error);
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
            <span>Create Project</span>
            <button
              onClick={() => {
                dispatch(setShowCreateProject(false));
              }}
              className="bg-none"
            >
              <CloseIcon />
            </button>
          </div>
          <div className="flex p-5 flex-col space-y-3 border-b overflow-auto">
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
            <span>Start Date</span>
            <TextField
              id="outlined-basic"
              className="w-full"
              size="small"
              variant="outlined"
              type="date"
              name="startDate"
              value={project.startDate}
              onChange={handleChange}
            />
            <span>
              End Date <span className="text-sm text-gray-400">(Optional)</span>
            </span>
            <TextField
              id="outlined-basic"
              className="w-full"
              size="small"
              variant="outlined"
              type="date"
              name="endDate"
              value={project.endDate}
              onChange={handleChange}
            />
          </div>
          <div className="p-3 space-x-3 justify-end flex">
            <button
              onClick={() => {
                dispatch(setShowCreateProject(false));
              }}
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
      </div>
    </>
  );
}

export default CreateProject;
