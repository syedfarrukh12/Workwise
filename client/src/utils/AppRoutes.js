import React from "react";
import { Route, Routes } from "react-router-dom";
import InviteRegistration from "../Pages/Invitation/InviteRegistration.jsx";

const Dashboard = React.lazy(() => import("../Pages/Dashboard/Dashboard.jsx"));
const Login = React.lazy(() => import("../Pages/Login/Login.jsx"));
const Signup = React.lazy(() => import("../Pages/signup/Signup.jsx"));

const AppRoutes = ({ setIsLoggedIn }) => {
  return (
    <Routes>
      <Route exact path="/" element={<Dashboard />} />
      <Route exact path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      <Route exact path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />
      <Route exact path="/invite/:code" element={<InviteRegistration />} />
      <Route exact path="/invite/direct/:code" element={<InviteRegistration />} />
    </Routes>
  );
};

export default AppRoutes;
