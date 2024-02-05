import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmationModal from "../../Components/Common/ConfirmationModal";
// import {
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
// } from "@mui/material";
import Signup from "../signup/Signup";
import axios from "axios";
import { API_URL } from "../../Components/Common/apiConfig";

function InviteRegistration() {
  const navigate = useNavigate();
  const [agree, setAgree] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const teamId = queryParams.get("teamId");

  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes("direct")) {
      setOpen(true);
      if (agree) navigate("/login");
    }
    //eslint-disable-next-line
  }, [agree]);

  function handleAgree() {
    setAgree(true);
    axios
      .put(`${API_URL}/addmember/${teamId}`, { email: email })
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      {open && (
        <ConfirmationModal
          title="You are being invited to join a Team by Invitee"
          handleFunction={handleAgree}
          setShowConfrimation={setOpen}
        />
      )}
      <Signup type="invite" propsEmail={email} teamId={teamId} />
    </>
  );
}

export default InviteRegistration;
