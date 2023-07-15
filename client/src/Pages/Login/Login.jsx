import React, { useEffect, useState } from "react";
import { Alert, Snackbar, TextField } from "@mui/material";
import axios from "axios";
import { API_URL } from "../../Components/Common/apiConfig.js";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/user.js";
import { checkEmail } from "../../Components/utils.js";

const Login = ({ setIsLoggedIn }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = localStorage.getItem("theme");
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
    if (!checkEmail(data.email)) {
      setOpen(true);
      return setSnackbarContent({ type: "error", content: 'Please enter a valid Email' });
    }

    axios
      .post(`${API_URL}/login`, data)
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(true);
          navigate("/");
          localStorage.setItem("apiKey", response.data._id);
          const { name, email, username, role, _id } = response.data;
          dispatch(login({ name, email, username, role, id: _id }));
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
            <button
              className={`rounded-full p-2 ${
                theme === "dark"
                  ? "bg-[#DDE6ED] text-[#27374D] hover:bg-[#a9b3bb]"
                  : "bg-[#27374D] text-[#DDE6ED] hover:bg-[#43556f]"
              }`}
              onClick={handleLogin}
            >
              Login
            </button>
            <div>
              or{" "}
              <Link
                className={`underline ${
                  theme === "dark"
                    ? " text-[#DDE6ED] hover:text-[#a9b3bb]"
                    : " text-[#27374D] hover:text-[#16253c]"
                }`}
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
