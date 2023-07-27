import { Autocomplete, Backdrop, Divider, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { setShowCreateProject } from "../../redux/nonPersistant";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../Common/apiConfig";
import { addProjects, setSelectedProject } from "../../redux/project";
import dayjs from 'dayjs';

function EditProject() {
  const dispatch = useDispatch();
  const theme = localStorage.getItem("theme");
  const user = useSelector((state) => state.user.value);
  const [users, setUsers] = useState([]);
  const userId = user._id;
  const showCreateProject = useSelector(
    (state) => state.nonPersistant.showCreateProject
  );
  const selectedProject = useSelector(
    (state) => state.projects.selectedProject
  );
  const [project, setProject] = useState(
    showCreateProject.type === "create"
      ? {
          name: "",
          description: "",
          startDate: "",
          endDate: "",
          createdAt: Date.now(),
          createdBy: user?._id,
          users: [userId],
        }
      : {
          name: selectedProject.name,
          description: selectedProject.description,
          startDate: selectedProject.startDate,
          endDate: selectedProject.endDate,
          users: [userId],
        }
  );
  const projectUserIds = project.users.map((user) => user._id);

  useEffect(() => {
    axios
      .get(`${API_URL}/users`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    //eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (showCreateProject.type === "create") {
      axios
        .post(`${API_URL}/project`, project)
        .then((response) => {
          dispatch(setShowCreateProject({ value: false, type: "" }));
          dispatch(addProjects(response.data));
          dispatch(setSelectedProject(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .put(`${API_URL}/project/${selectedProject._id}`, project)
        .then((response) => {
          dispatch(setShowCreateProject({ value: false, type: "" }));
          dispatch(setSelectedProject(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleClose = () => {
    dispatch(setShowCreateProject({ value: false, type: "" }));
  };
  return (
    <>
      <div>
        <Backdrop
          open={true}
          style={{ zIndex: 30 }}
          onClick={() => {
            dispatch(setShowCreateProject({ value: false, type: "" }));
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full lg:w-[50%] md:w-[80%] rounded-lg flex flex-col ${
              theme === "dark" ? "bg-[#27374D]" : "bg-[#DDE6ED]"
            }`}
          >
            <div className="flex justify-between p-3 items-center">
              <div>
                {showCreateProject.type === "create" ? "Create" : "Edit"}{" "}
                project
              </div>
              <div
                onClick={handleClose}
                className="cursor-pointer rounded-full hover:bg-black/20 p-1"
              >
                <CloseIcon className="!w-5 !h-5" />
              </div>
            </div>
            <Divider />
            <div>
              <div className="flex p-5 flex-col space-y-3 overflow-auto">
                <span>Project Title</span>
                <TextField
                  id="outlined-basic"
                  className="w-full"
                  size="small"
                  value={project.name}
                  onChange={handleChange}
                  variant="outlined"
                  name="name"
                  placeholder="Name for project"
                />
                <span>Project Description</span>
                <TextField
                  id="outlined-basic"
                  className="w-full"
                  value={project.description}
                  placeholder="Description for project"
                  size="small"
                  onChange={handleChange}
                  variant="outlined"
                  multiline
                  name="description"
                  rows={4}
                />
                <div className="lg:flex lg:space-x-5 space-y-3 lg:space-y-0">
                  <div className="w-full">
                    <span>Start Date</span>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          className="w-full"
                          size="small"
                          disablePast
                          value={dayjs(project.startDate)}
                          onChange={(newValue) =>
                            setProject((prev) => ({
                              ...prev,
                              startDate: newValue,
                            }))
                          }
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <div className="w-full">
                    <span>End Date (optional)</span>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                          className="w-full"
                          size="small"
                          disablePast
                          value={dayjs(project.endDate)}
                          onChange={(newValue) =>
                            setProject((prev) => ({
                              ...prev,
                              endDate: newValue,
                            }))
                          }
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                </div>

                {showCreateProject.type !== "create" && (
                  <div>
                    <span>Users</span>
                    <Autocomplete
                      disablePortal
                      className="w-full"
                      multiple
                      name="users"
                      size="small"
                      id="combo-box-demo"
                      onChange={(event, newValue) =>
                        setProject((prev) => ({
                          ...prev,
                          users: newValue.map((user) => user._id),
                        }))
                      }
                      options={users}
                      getOptionLabel={(user) => user.name}
                      defaultValue={users.filter((user) =>
                        projectUserIds.includes(user._id)
                      )}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </div>
                )}
              </div>
            </div>
            <div>
              <Divider />
              <div className="p-3 space-x-3 justify-end flex">
                <button
                  onClick={handleClose}
                  className="bg-red-500 hover:bg-red-700 py-2 px-4 rounded-full text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-sky-600 hover:bg-sky-800 py-2 px-4 rounded-full text-white"
                >
                  {showCreateProject.type === "create"
                    ? "Create project"
                    : "Save"}
                </button>
              </div>
            </div>
          </div>
        </Backdrop>
      </div>
    </>
  );
}

export default EditProject;
