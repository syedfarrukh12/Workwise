import { TextField } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { API_URL } from "../Common/apiConfig";
import { useDispatch } from "react-redux";
import { setOpenAlert, setShowInvite } from "../../redux/nonPersistant";

function InviteModal() {
  const dispatch = useDispatch();
  const theme = localStorage.getItem("theme");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    axios
      .post(`${API_URL}/invite`, {email: email})
      .then((response) => {
        console.log(response.data);
        dispatch(setOpenAlert({value: true, message: response.data, type: 'success'}))
        dispatch(setShowInvite(false))
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
          } md:rounded-2xl lg:w-[30%] md:w-[50%]  w-full lg:ml-80 mt-[-60px] shadow-2xl`}
        >
          <div className="flex justify-between p-3 border-b">
            <span>Invite People</span>
            <button onClick={() => {
              dispatch(setShowInvite(false))
            }} className="bg-none">
              <CloseIcon />
            </button>
          </div>
          <div className="p-5 border-b">
            <span>Email</span>
            <TextField
              id="outlined-basic"
              className="w-full"
              size="small"
              variant="outlined"
              type="email"
              placeholder="Enter the email to send Invite"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="p-3 space-x-3 justify-end flex">
            <button
              onClick={() => {
                dispatch(setShowInvite(false))
              }}
              className="bg-red-500 hover:bg-red-700 p-2 rounded-lg text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-sky-600 hover:bg-sky-800 p-2 rounded-lg text-white"
            >
              Send Invite
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default InviteModal;
