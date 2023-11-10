import React from "react";
import { Route, Routes } from "react-router-dom";

const Dashboard = React.lazy(() => import("../Pages/Dashboard/Dashboard.jsx"));
const Login = React.lazy(() => import("../Pages/Login/Login.jsx"));
const Signup = React.lazy(() => import("../Pages/signup/Signup.jsx"));

const AppRoutes = ({ setIsLoggedIn }) => {
  return (
    <Routes>
      <Route exact path="/" element={<Dashboard />} />
      <Route exact path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      <Route exact path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
    </Routes>
  );
};

export default AppRoutes;
