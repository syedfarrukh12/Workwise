import React, { useEffect, useState } from "react";
import { Backdrop, Divider, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { API_URL } from "../Common/apiConfig";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { setOpenAlert } from "../../redux/nonPersistant";
import TeamCard from "./TeamCard";
import CreateTeam from "./CreateTeam";

function TeamsModal({ setShowTeamsModal, showTeamModal }) {
  const theme = localStorage.getItem("theme");
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.value);
  const [projects, setProjects] = useState([]);
  const [teams, setTeams] = useState([]);
  const [team, setTeam] = useState({
    manager: currentUser._id,
    teamName: "",
    assignedProjects: [],
    members: [],
  });
  const [memberCount, setMemberCount] = useState(1);
  const [createTeam, setCreateTeam] = useState(false);
  const [editTeam, setEditTeam] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/projects/${currentUser._id}`).then((res) => {
      setProjects(res.data);
    });

    axios.get(`${API_URL}/teams/${currentUser._id}`).then((res) => {
      setTeams(res.data);
    });
  }, [currentUser._id, showTeamModal]);

  const handleSubmit = () => {
    axios
      .post(`${API_URL}/team`, team)
      .then((res) => {
        console.log(res);
        dispatch(
          setOpenAlert({
            value: true,
            message: "Team Created Successfully and Invitations are sent ",
            type: "success",
          })
        );
        setShowTeamsModal(false);
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          setOpenAlert({
            value: true,
            message: error.response.data,
            type: "error",
          })
        );
      });
  };

  const handleEmailChange = (index, email) => {
    const updatedMembers = [...team.members];
    updatedMembers[index] = email;
    setTeam((prev) => ({
      ...prev,
      members: updatedMembers,
    }));
  };

  const memberFields = [];
  for (let i = 0; i < memberCount; i++) {
    memberFields.push(
      <div key={i}>
        <span>Email of team member {i + 1}</span>
        <TextField
          id={`email-${i}`}
          className="w-full"
          size="small"
          variant="outlined"
          type="email"
          name={`email-${i}`}
          onChange={(e) => handleEmailChange(i, e.target.value)}
          placeholder="Please add email to invite members"
        />
      </div>
    );
  }
  return (
    <>
      <Backdrop open={showTeamModal} sx={{ zIndex: 30 }}>
        <div
          className={`${
            theme === "dark" ? "bg-[#27374D]" : "bg-[#DDE6ED]"
          } md:rounded-2xl lg:w-[40%] md:w-[70%] w-full shadow-2xl`}
        >
          <div className="flex justify-between p-3 items-center">
            <div>Manage Teams</div>
            <div
              onClick={() => setShowTeamsModal(false)}
              className="cursor-pointer rounded-full hover:bg-black/20 p-1"
            >
              <CloseIcon className="!w-5 !h-5" />
            </div>
          </div>
          <Divider />
          <div className="max-h-[70vh] overflow-auto">
            {teams.length > 0 ? (
              teams.map((team, index) => (
                <TeamCard
                  key={team._id}
                  editTeam={editTeam}
                  setEditTeam={setEditTeam}
                  team={team}
                  setShowTeamsModal={setShowTeamsModal}
                  setCreateTeam={setCreateTeam}
                />
              ))
            ) : (
              <div className="text-center">You dont have any teams!</div>
            )}

            <div
              onClick={() => setCreateTeam(true)}
              className="p-2 hover:underline cursor-pointer rounded-full font-semibold w-fit flex items-center"
            >
              <AddOutlinedIcon className="!w-5 !h-5" />
              <div>Create Team</div>
            </div>
            {createTeam && (
              <CreateTeam
                setCreateTeam={setCreateTeam}
                setTeam={setTeam}
                projects={projects}
                memberFields={memberFields}
                setMemberCount={setMemberCount}
                memberCount={memberCount}
              />
            )}
          </div>

          <Divider />
          <div className="p-3 space-x-3 justify-end flex">
            <button
              onClick={() => setShowTeamsModal(false)}
              className="bg-red-500 hover:bg-red-700 py-2 px-4 rounded-full text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-sky-600 hover:bg-sky-800 py-2 px-4 rounded-full text-white"
            >
              Save
            </button>
          </div>
        </div>
      </Backdrop>
    </>
  );
}

export default TeamsModal;
