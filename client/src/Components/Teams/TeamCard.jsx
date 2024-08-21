import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { TextField } from "@mui/material";
import { API_URL } from "../Common/apiConfig";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setOpenAlert } from "../../redux/nonPersistant";
import { camelCaseToSentenceCase } from "../utils";
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function TeamCard({
  editTeam,
  setEditTeam,
  team,
  setShowTeamsModal,
  setCreateTeam,
}) {

  const theme = localStorage.getItem("theme");
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [showList, setShowList] = useState(false);

  const addMember = () => {
    if (email)
      axios
        .post(`${API_URL}/member/${team._id}`, { email })
        .then((res) => {
          console.log(res);
          dispatch(
            setOpenAlert({
              value: true,
              message: res.data.message,
              type: "success",
            })
          );
          setShowTeamsModal(false);
          setCreateTeam(false);
          setEditTeam(false);
        })
        .catch((error) => {
          console.log(error);
        });
  };

  const removeMember = () => {
    if (email)
      axios
        .put(`${API_URL}/removemember/${team._id}`, { email })
        .then((res) => {
          console.log(res.data);
          dispatch(
            setOpenAlert({
              value: true,
              message: res.data.message,
              type: "success",
            })
          );
          setShowTeamsModal(false);
          setCreateTeam(false);
          setEditTeam(false);
        })
        .catch((error) => {
          console.log(error);
          dispatch(
            setOpenAlert({
              value: true,
              message: error.response.data.message,
              type: "error",
            })
          );
        });
  };

  return (
    <>
      <div className="p-3">
        <div
          onClick={() => setShowList(!showList)}
          className={`p-3 w-full rounded-lg flex cursor-pointer justify-between items-center mt-1 ${
            theme === "dark" ? "bg-[#212f42]" : "bg-[#c6ced4]"
          }`}
        >
          <div className="flex items-center">
           
           {showList ? <ExpandLessIcon /> : <ExpandMoreOutlinedIcon />}    

            <div>{team.teamName}</div>
            <div
              className={`px-2 py-1 ml-2 rounded-full ${
                theme === "dark" ? "bg-[#324662]" : "bg-[#d5dfe8]"
              }`}
            >
              {team.members.length}
            </div>
          </div>
          <div className="flex items-center">
            <EditOutlinedIcon
              className="!w-5 !h-5 cursor-pointer hover:opacity-50"
              onClick={(e) => {
                e.stopPropagation();
                setEditTeam(!editTeam);
              }}
            />
            {/* <div className="p-2 justify-end cursor-pointer rounded-full font-semibold w-full flex items-center">
              <div
                className="hover:underline"
                onClick={() => setShowList(!showList)}
              >
                {showList ? "Hide List" : "Show List"}
              </div>
            </div> */}
          </div>
        </div>

        {showList && (
          <div
            className={`flex text-sm p-2 justify-center flex-col mx-3 rounded-lg mt-1 ${
              theme === "dark" ? "bg-[#212f42]" : "bg-[#c6ced4]"
            }`}
          >
            {team.members.map((member, index) => (
              <div key={member._id} className="flex justify-between">
                <div>
                  <span>{index + 1}-</span> <span>{member.name}</span>{" "}
                  <span className="text-xs opacity-50">({member.email})</span>
                </div>
                <div className="mt-1">
                  <span className="text-xs opacity-80 text-black rounded-lg px-2 bg-white/50">
                    {camelCaseToSentenceCase(member.role)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {editTeam && (
          <div
            className={`flex text-sm p-2 flex-col rounded-lg mt-1 ${
              theme === "dark" ? "bg-[#212f42]" : "bg-[#c6ced4]"
            }`}
          >
            <TextField
              label="Email"
              size="small"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex gap-2 pt-2">
              <button
                onClick={addMember}
                className="bg-white/10 py-2 px-3 rounded-full w-full lg:w-fit"
              >
                Add a member
              </button>
              <button
                onClick={removeMember}
                className="bg-white/10 py-2 px-3 rounded-full w-full lg:w-fit"
              >
                Remove a member
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default TeamCard;
