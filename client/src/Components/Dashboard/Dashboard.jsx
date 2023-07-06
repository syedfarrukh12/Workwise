import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../Common/apiConfig";
import {
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addProjects, setSelectedProject } from "../../redux/project";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.value);
  const projects = useSelector((state) => state.projects.projects);
  const selectedProject = useSelector((state) => state.projects.selectedProject);

  useEffect(() => {
    if (!localStorage.getItem("apiKey")) {
      navigate("/login");
    }
    axios
      .get(`${API_URL}/projects/${user.id}`)
      .then((response) => {
        dispatch(addProjects(response.data[0]));
      })
      .catch((error) => {
        console.log(error);
      });
    //eslint-disable-next-line
  }, []);

  const handleProjectChange = (event) => {
    const selectedProject = event.target.value;
    dispatch(setSelectedProject(selectedProject));
  };

  if (projects.length > 0) {
    return (
      <>
        <div className="w-52 p-5">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Projects</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedProject}
              label="Project"
              size="small"
              onChange={handleProjectChange}
            >
              {projects && projects.map((project) => (
                <MenuItem key={project.name} value={project}>
                  {project.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {selectedProject && (
          <>
            <div className="p-5 border">
              {selectedProject.name} <br />
              {selectedProject.description}
            </div>
            <div className="p-5">
              <h2>{user?.email}</h2>
              <h2>{user?.name}</h2>
              <h2>{user?.username}</h2>
              <h2>{user?.role}</h2>
              <h2>{user?.id}</h2>
            </div>
          </>
        )}
      </>
    );
  } else {
    return <LinearProgress />;
  }
};

export default Dashboard;
