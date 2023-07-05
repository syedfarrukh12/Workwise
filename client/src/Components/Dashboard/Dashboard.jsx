import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("apiKey")) {
      navigate("/login");
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div>
    </div>
  );
};

export default Dashboard;
