import React, { useEffect, useState } from "react";
import { Alert, Snackbar, TextField } from "@mui/material";
import axios from "axios";
import { API_URL } from "../../Components/Common/apiConfig.js";
import { Link, useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { isValidEmail } from "../../Components/utils.js";
import { useDispatch } from "react-redux";
import { login } from "../../redux/user.js";
import { setOpenAlert } from "../../redux/nonPersistant.js";

const Signup = ({ setIsLoggedIn, type, propsEmail, teamId }) => {
  const navigate = useNavigate();
  const theme = localStorage.getItem("theme");
  const dispatch = useDispatch();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState({
    type: "",
    content: "",
  });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // const [usernameError, setUsernameError] = useState("");
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: type === "invite" ? propsEmail : "",
    password: "",
    role: type === "invite" ? "developer" | "qa" : "manager",
  });
  const [tempUser, setTempUser] = useState("");

  useEffect(() => {
    if (localStorage.getItem("apiKey")) {
      if (type !== "invite") navigate("/");
    }
    //eslint-disable-next-line
  }, []);

  const handleSignup = () => {
    if (user.password === confirmPassword) {
      if (!isValidEmail(user.email)) {
        return setEmailError("Email is invalid");
      }
      if (user.password.length < 8) {
        return setPasswordError(
          "Password must be at least eight characters long"
        );
      }
      axios
        .post(`${API_URL}/signup`, user)
        .then((response) => {
          console.log(response.data);
          localStorage.setItem("apiKey", response.data.token);
          setTempUser(response.data.user._id);
          dispatch(login(response.data.user));
          navigate("/");
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.log(error);
          setSnackbarContent({ type: "error", content: error.response.data });
          setOpen(true);
        });
    } else {
      return setPasswordError("Passwords do not match");
    }
  };

  useEffect(() => {
    if (tempUser && type === "invite") {
      console.log("TEMP USER => ", tempUser);
      const memberId = tempUser;
      axios
        .put(`${API_URL}/addmember/${teamId}`, { memberId })
        .then((res) => {
          dispatch(
            setOpenAlert({
              value: true,
              message: "You are successfully added to the team.",
              type: "success",
            })
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
    //eslint-disable-next-line
  }, [tempUser, teamId, type]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <div>
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
        <div className="flex justify-center items-center h-screen">
          <div
            style={{ backgroundColor: "rgba(0,0,0,0.05)" }}
            className="m-16 w-full justify-center lg:py-24 flex rounded-xl"
          >
            <div className="w-96 rounded-xl space-y-4 p-5 flex flex-col">
              <div className="text-5xl text-center py-5 text">
                <code>Workwise</code>
              </div>
              <TextField
                id="outlined-basic"
                label="Name"
                required={true}
                size="small"
                variant="outlined"
                onChange={(e) => {
                  setUser((prevUser) => ({
                    ...prevUser,
                    name: e.target.value,
                  }));
                }}
              />
              <TextField
                id="outlined-basic"
                label="Username"
                size="small"
                variant="outlined"
                value={user.username}
                required={true}
                onChange={(e) => {
                  setUser((prevUser) => ({
                    ...prevUser,
                    username: e.target.value.toLowerCase(),
                  }));
                }}
              />
              <TextField
                id="outlined-basic"
                label="Email"
                size="small"
                error={!!emailError && emailError}
                type="email"
                required={true}
                value={propsEmail}
                disabled={type === "invite"}
                variant="outlined"
                onChange={(e) => {
                  setUser((prevUser) => ({
                    ...prevUser,
                    email: e.target.value,
                  }));
                  setEmailError("");
                }}
                helperText={emailError}
              />
              <TextField
                id="outlined-basic"
                label="Password"
                type="password"
                size="small"
                error={!!passwordError}
                required={true}
                variant="outlined"
                onChange={(e) => {
                  setUser((prevUser) => ({
                    ...prevUser,
                    password: e.target.value,
                  }));
                  setPasswordError("");
                }}
                helperText={passwordError}
              />
              <TextField
                id="outlined-basic"
                label="Confirm Password"
                type="password"
                required={true}
                size="small"
                variant="outlined"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setPasswordError("");
                }}
              />
              {type === "invite" ? (
                <FormControl fullWidth>
                  <InputLabel size="small" id="demo-simple-select-label">
                    Role
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={user.role}
                    required={true}
                    size="small"
                    label="Role"
                    onChange={(e) => {
                      setUser((prevUser) => ({
                        ...prevUser,
                        role: e.target.value,
                      }));
                    }}
                  >
                    <MenuItem value={"developer"}>Developer</MenuItem>
                    <MenuItem value={"qa"}>QA</MenuItem>
                  </Select>
                </FormControl>
              ) : (
                <FormControl fullWidth>
                  <InputLabel size="small" id="demo-simple-select-label">
                    Role
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={user.role}
                    required={true}
                    size="small"
                    label="Role"
                    onChange={(e) => {
                      setUser((prevUser) => ({
                        ...prevUser,
                        role: e.target.value,
                      }));
                    }}
                  >
                    <MenuItem value={"manager"}>Manager</MenuItem>
                  </Select>
                </FormControl>
              )}

              {type === "invite" ? (
                <button
                  className={`rounded-full p-2 ${
                    theme === "dark"
                      ? "bg-[#DDE6ED] text-[#27374D] hover:bg-[#a9b3bb]"
                      : "bg-[#27374D] text-[#DDE6ED] hover:bg-[#43556f]"
                  }`}
                  onClick={() => {
                    handleSignup();
                  }}
                >
                  Continue
                </button>
              ) : (
                <button
                  className={`rounded-full p-2 ${
                    theme === "dark"
                      ? "bg-[#DDE6ED] text-[#27374D] hover:bg-[#a9b3bb]"
                      : "bg-[#27374D] text-[#DDE6ED] hover:bg-[#43556f]"
                  }`}
                  onClick={handleSignup}
                >
                  Create Account
                </button>
              )}
              {type !== "invite" && (
                <div>
                  Already have account?{" "}
                  <Link
                    className={`underline ${
                      theme === "dark"
                        ? " text-[#DDE6ED] hover:text-[#a9b3bb]"
                        : " text-[#27374D] hover:text-[#16253c]"
                    }`}
                    to="/login"
                  >
                    Log in
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
