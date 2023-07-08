import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedProject, setShowCreateProject } from "../../redux/project";
import AssignmentIcon from '@mui/icons-material/Assignment';

function Sidebar() {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);
  const theme = localStorage.getItem("theme");

  const handleProjectChange = (event) => {
    const selectedProject = event.target.value;
    dispatch(setSelectedProject(selectedProject));
  };

  const selectedProject = useSelector(
    (state) => state.projects.selectedProject
  );

  return (
    <div
      className={`flex flex-col justify-start text-xs space-y-3 ${
        theme === "dark" ? "bg-[#20324c]" : "bg-[#eaf2f8]"
      } p-3 fixed top-14 pt-4 left-0 h-full w-[15%] hidden lg:flex`}
    >
      <FormControl>
        <InputLabel id="demo-simple-select-label">Projects</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedProject}
          label="Project"
          size="small"
          onChange={handleProjectChange}
        >
          {projects &&
            projects.map((project) => (
              <MenuItem key={project._id} value={project}>
                {project.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <button
        onClick={() => {
          dispatch(setShowCreateProject(true))
        }}
        className={`cursor-pointer py-2 px-4 justify-center flex space-x-3 rounded-full ${
          theme === "dark"
            ? "bg-white/10 hover:bg-white/20 :"
            : "bg-black/10 hover:bg-black/20"
        }`}
      >
        <AddIcon style={{ width: "20px", height: "20px", marginTop: "-3px" }} />
        <span className="hidden md:inline">Create Project</span>
      </button>
      <button
        className={`cursor-pointer py-2 px-4 justify-center flex space-x-3 rounded-full ${
          theme === "dark"
            ? "bg-white/10 hover:bg-white/20 :"
            : "bg-black/10 hover:bg-black/20"
        }`}
      >
        <AssignmentIcon style={{ width: "20px", height: "20px", marginTop: "-3px" }} />
        <span className="hidden md:inline">Add Ticket</span>
      </button>
    </div>
  );
}

export default Sidebar;
