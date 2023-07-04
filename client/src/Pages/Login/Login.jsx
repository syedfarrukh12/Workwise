import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { API_URL } from "../../Components/Common/apiConfig.js";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
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
          localStorage.setItem("apiKey", "true");
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div
          style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
          className="m-16 w-full py-52 justify-center flex rounded-xl"
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
              <Link className="text-blue-500 underline hover:text-blue-800" to="/signup">
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
