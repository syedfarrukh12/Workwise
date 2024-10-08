import { Backdrop, Divider, TextField } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { API_URL } from "../Common/apiConfig";
import { useDispatch } from "react-redux";
import { setOpenAlert, setShowInvite } from "../../redux/nonPersistant";
import { checkEmail } from "../utils";

function InviteModal() {
  const dispatch = useDispatch();
  const theme = localStorage.getItem("theme");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (!checkEmail(email)) {
      return dispatch(setOpenAlert({ value: true, message: "Email is Invalid.", type: 'error' }));
    }
    axios
      .post(`${API_URL}/invite`, { email: email })
      .then((response) => {
        console.log(response.data);
        dispatch(
          setOpenAlert({ value: true, message: response.data, type: "success" })
        );
        dispatch(setShowInvite(false));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Backdrop
        onClick={() => {
          dispatch(setShowInvite(false));
        }}
        open={true}
        style={{ zIndex: 30 }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`${
            theme === "dark" ? "bg-[#27374D]" : "bg-[#DDE6ED]"
          } md:rounded-2xl lg:w-[30%] md:w-[50%]  w-full shadow-2xl`}
        >
          <div className="flex justify-between p-3">
            <span>Invite People</span>
            <button
              onClick={() => {
                dispatch(setShowInvite(false));
              }}
              className="cursor-pointer hover:bg-black/10 w-fit rounded-full ml-auto"
            >
              <CloseIcon className="!w-5 !h-5"/>
            </button>
          </div>
          <Divider />
          <div className="p-5">
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
          <Divider />
          <div className="p-3 space-x-3 justify-end flex">
            <button
              onClick={() => {
                dispatch(setShowInvite(false));
              }}
              className="bg-red-500 hover:bg-red-700 py-2 px-3 rounded-full text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-sky-600 hover:bg-sky-800 py-2 px-3 rounded-full text-white"
            >
              Send Invite
            </button>
          </div>
        </div>
      </Backdrop>
    </>
  );
}

export default InviteModal;
