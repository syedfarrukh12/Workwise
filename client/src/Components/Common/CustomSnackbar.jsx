import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { setOpenAlert } from "../../redux/nonPersistant";
import { useDispatch } from "react-redux";

function CustomSnackbar({ value, type, message }) {
  const dispatch = useDispatch()
  const handleClose = () => {
    dispatch(setOpenAlert({ value: false, message: "", type: "" }));
  };
  return (
    <>
      <Snackbar
        open={value}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default CustomSnackbar;
