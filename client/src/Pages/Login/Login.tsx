import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { API_URL } from "../../Components/Common/apiConfig.js";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("apiKey")){
      navigate('/')
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
          navigate("/");
          localStorage.setItem("apiKey", "true");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="h-96 w-96 rounded-xl space-y-4 p-5 flex flex-col">
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
        </div>
      </div>
    </>
  );
};

export default Login;
