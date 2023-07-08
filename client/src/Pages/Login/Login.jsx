import React, { useEffect, useState } from "react";
import { Alert, Button, Snackbar, TextField } from "@mui/material";
import axios from "axios";
import { API_URL } from "../../Components/Common/apiConfig.js";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/user.js";

const Login = ({ setIsLoggedIn }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [snackbarContent, setSnackbarContent] = useState({
    type: "",
    content: "",
  });

  useEffect(() => {
    if (localStorage.getItem("apiKey")) {
      navigate("/");
    }
    //eslint-disable-next-line
  }, []);
  const handleLogin = () => {
    const data = {
      email: user.email,
      password: user.password,
    };

    axios
      .post(`${API_URL}/login`, data)
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(true);
          navigate("/");
          localStorage.setItem("apiKey", response.data._id);
          const {name, email, username, role, _id} = response.data
          dispatch(login({name, email, username, role, id: _id}))
        }
      })
      .catch((error) => {
        console.error(error);
        setOpen(true);
        setSnackbarContent({ type: "error", content: error.response.data });
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={snackbarContent.type}
            sx={{ width: "100%" }}
          >
            {snackbarContent.content}
          </Alert>
        </Snackbar>
        <div
          style={{ backgroundColor: "rgba(0,0,0,0.05)" }}
          className="m-16 w-full lg:py-52 justify-center flex rounded-xl"
        >
          <div className="w-96 rounded-xl space-y-4 p-5 flex flex-col">
            <div className="text-5xl text-center py-5 text">
              <code>Workwise</code>
            </div>
            <TextField
              id="outlined-basic"
              label="Email"
              size="small"
              type="email"
              variant="outlined"
              onChange={(e) => {
                setUser((prevUser) => ({
                  ...prevUser,
                  email: e.target.value,
                }));
              }}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              type="password"
              size="small"
              variant="outlined"
              onChange={(e) => {
                setUser((prevUser) => ({
                  ...prevUser,
                  password: e.target.value,
                }));
              }}
            />
            <Button variant="contained" onClick={handleLogin}>
              Login
            </Button>
            <div>
              or{" "}
              <Link
                className="text-blue-500 underline hover:text-blue-800"
                to="/signup"
              >
                Sign up
              </Link>{" "}
              to start your project
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
