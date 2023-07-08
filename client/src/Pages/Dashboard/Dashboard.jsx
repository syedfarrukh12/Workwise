import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../Components/Common/apiConfig";

import { useDispatch, useSelector } from "react-redux";
import { addProjects } from "../../redux/project";
import CreateProject from "../../Components/CreateProject/CreateProject";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const showCreateModal = useSelector(
    (state) => state.projects.showCreateProject
  );
  const selectedProject = useSelector(
    (state) => state.projects.selectedProject
  );

  useEffect(() => {
    if (!localStorage.getItem("apiKey")) {
      navigate("/login");
    }
    axios
      .get(`${API_URL}/projects/${user.id}`)
      .then((response) => {
        dispatch(addProjects(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      {showCreateModal && (
        <div>
          <CreateProject />
        </div>
      )}

      <div className="p-5 space-y-5">
        {selectedProject && (
          <>
            <div className="">
              {selectedProject.name} <br />
              {selectedProject.description}
            </div>
            <hr />
            <div className="">
              <h2>{user?.email}</h2>
              <h2>{user?.name}</h2>
              <h2>{user?.username}</h2>
              <h2>{user?.role}</h2>
              <h2>{user?.id}</h2>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
