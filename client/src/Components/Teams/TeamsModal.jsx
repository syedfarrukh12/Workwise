import React, { useEffect, useState } from "react";
import { Autocomplete, Backdrop, Divider, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { API_URL } from "../Common/apiConfig";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { setOpenAlert } from "../../redux/nonPersistant";

function TeamsModal({ setShowTeamsModal, showTeamModal }) {
  const theme = localStorage.getItem("theme");
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.value);
  const [projects, setProjects] = useState([]);
  const [team, setTeam] = useState({
    manager: currentUser._id,
    teamName: "",
    assignedProjects: [],
    members: [],
  });
  const [memberCount, setMemberCount] = useState(1);

  useEffect(() => {
    axios.get(`${API_URL}/projects/${currentUser._id}`).then((res) => {
      setProjects(res.data);
    });
  }, [currentUser._id]);

  const handleSubmit = () => {
    console.log("HERE TEAM", team);
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
          <div className="p-3 space-y-3 max-h-[70vh] overflow-auto">
            <div>
              <span>Team Name</span>
              <TextField
                id="outlined-basic"
                className="w-full"
                size="small"
                variant="outlined"
                name="teamname"
                onChange={(e) => {
                  setTeam((prev) => ({
                    ...prev,
                    teamName: e.target.value,
                  }));
                }}
                placeholder="Add a name for team"
              />
            </div>
            <div>
              <span>Project</span>
              <Autocomplete
                disablePortal
                className="w-full"
                multiple
                name="projects"
                size="small"
                id="combo-box-demo"
                onChange={(event, newValue) =>
                  setTeam((prev) => ({
                    ...prev,
                    assignedProjects: newValue.map((project) => project._id),
                  }))
                }
                options={projects}
                getOptionLabel={(user) => user.name}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>

            {memberFields}

            <button
              className="font-medium rounded-full py-1 px-2 cursor-pointer flex items-center"
              onClick={() => {
                setMemberCount(memberCount + 1);
              }}
            >
              <AddOutlinedIcon className="!w-5 !h-5" />
              <div>Add another member</div>
            </button>
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
