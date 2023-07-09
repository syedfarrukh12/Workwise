import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedProject, setShowCreateProject } from "../../redux/project";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HelpIcon from "@mui/icons-material/Help";
import { setShowInvite, setShowTicket } from "../../redux/nonPersistant";

function Sidebar() {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);
  const currentUser = useSelector((state) => state.user.value);
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
      className={`flex flex-col text-sm space-y-3 ${
        theme === "dark" ? "bg-[#20324c]" : "bg-[#eaf2f8]"
      } p-3 fixed top-14 pt-4 left-0 h-[93.5%] w-[15%] hidden lg:flex`}
    >
      <div className="space-y-3 justify-start flex flex-col">
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
        {currentUser.role === "manager" && (
          <button
            onClick={() => {
              dispatch(setShowInvite(false));
              dispatch(setShowTicket({value:false, type: ''}));
              dispatch(setShowCreateProject(true));
            }}
            className={`cursor-pointer py-2 px-4 justify-center flex items-center space-x-1 rounded-full ${
              theme === "dark"
                ? "bg-white/10 hover:bg-white/20 :"
                : "bg-black/10 hover:bg-black/20"
            }`}
          >
            <AddIcon style={{ width: "15px", height: "15px" }} />
            <span className="hidden md:inline">Create Project</span>
          </button>
        )}

        <button
          onClick={() => {
            dispatch(setShowInvite(false));
            dispatch(setShowTicket({value:true, type: ''}));
            dispatch(setShowCreateProject(false));
          }}
          className={`cursor-pointer py-2 px-4 justify-center items-center flex space-x-2 rounded-full ${
            theme === "dark"
              ? "bg-white/10 hover:bg-white/20 :"
              : "bg-black/10 hover:bg-black/20"
          }`}
        >
          <AssignmentIcon style={{ width: "15px", height: "15px" }} />
          <span className="hidden md:inline">Add Ticket</span>
        </button>
      </div>
      <div className="flex-grow" />
      <div className="space-y-3 justify-end flex flex-col">
        <button
          className={`cursor-pointer py-2 px-4 justify-center items-center flex space-x-2 rounded-full ${
            theme === "dark"
              ? "bg-white/10 hover:bg-white/20 :"
              : "bg-black/10 hover:bg-black/20"
          }`}
        >
          <HelpIcon style={{ width: "15px", height: "15px" }} />
          <span className="hidden md:inline">Help</span>
        </button>
        <button
          onClick={() => {
            dispatch(setShowCreateProject(false));
            dispatch(setShowInvite(true));
            dispatch(setShowTicket({value:false, type: ''}));
          }}
          className={`cursor-pointer py-2 px-4 justify-center items-center flex space-x-2 rounded-full ${
            theme === "dark"
              ? "bg-white/10 hover:bg-white/20 :"
              : "bg-black/10 hover:bg-black/20"
          }`}
        >
          <PersonAddIcon style={{ width: "15px", height: "15px" }} />
          <span className="hidden md:inline">Invite</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
