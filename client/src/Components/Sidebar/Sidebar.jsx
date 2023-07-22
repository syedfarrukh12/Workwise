import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HelpIcon from "@mui/icons-material/Help";
import { setShowInvite, setShowTicket, setShowCreateProject } from "../../redux/nonPersistant";

function Sidebar({ setShowProjectDialog }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.value);
  const theme = localStorage.getItem("theme");

  const selectedProject = useSelector(
    (state) => state.projects.selectedProject
  );

  return (
    <div
      className={`flex flex-col text-sm shadow-lg space-y-3 ${
        theme === "dark" ? "bg-[#20324c]" : "bg-[#eaf2f8]"
      } p-3 fixed top-14 pt-4 left-0 h-[93.5%] w-[15%] hidden lg:flex z-10 `}
    >
      <div className="space-y-3 justify-start flex flex-col">
        <div
          className="text-base text-center border p-3 rounded-lg cursor-pointer font-semibold"
          onClick={() => setShowProjectDialog(true)}
        >
          {selectedProject.name}
        </div>
        {(currentUser.role === "manager" || currentUser.role === "admin") && (
          <button
            onClick={() => {
              dispatch(setShowInvite(false));
              dispatch(setShowTicket({ value: false, type: "" }));
              dispatch(setShowCreateProject({ value: true, type: "create" }));
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

        {Object.keys(selectedProject).length !== 0 && (
          <button
            onClick={() => {
              dispatch(setShowInvite(false));
              dispatch(setShowTicket({ value: true, type: "" }));
              dispatch(setShowCreateProject({ value: false, type: "" }));
            }}
            className={`cursor-pointer py-2 px-4 justify-center items-center flex space-x-2 rounded-full ${
              theme === "dark"
                ? "bg-white/10 hover:bg-white/20"
                : "bg-black/10 hover:bg-black/20"
            }`}
          >
            <AssignmentIcon style={{ width: "15px", height: "15px" }} />
            <span className="hidden md:inline">Add Ticket</span>
          </button>
        )}
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
            dispatch(setShowCreateProject({ value: false, type: "" }));
            dispatch(setShowInvite(true));
            dispatch(setShowTicket({ value: false, type: "" }));
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
