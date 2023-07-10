import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../Components/Common/apiConfig";

import { useDispatch, useSelector } from "react-redux";
import { addProjects } from "../../redux/project";
import CreateProject from "../../Components/CreateProject/CreateProject";
import InviteModal from "../../Components/InviteModal/InviteModal";
import CustomSnackbar from "../../Components/Common/CustomSnackbar";
import TicketModal from "../../Components/TicketModal/TicketModal";
import CustomAccordion from "../../Components/Common/CustomAccordion";
import MobileNavbar from "../../Components/MobileNarbar/MobileNavbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import CustomDialog from "../../Components/Common/CustomDialog";
import CustomNavigation from "../../Components/Common/CustomNavigation";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const showCreateModal = useSelector(
    (state) => state.projects.showCreateProject
  );
  const selectedProject = useSelector(
    (state) => state.projects.selectedProject?._id
  );
  const showInviteModal = useSelector(
    (state) => state.nonPersistant.showInvite
  );
  const showTicketModal = useSelector(
    (state) => state.nonPersistant.showTicket
  );
  const projects = useSelector((state) => state.projects.projects);
  const snackbar = useSelector((state) => state.nonPersistant.openAlert);
  const allTasks = useSelector((state) => state.nonPersistant.tasks);
  const [tasks, setTasks] = useState([]);
  const [showProjectDialog, setShowProjectDialog] = useState(false);

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

  useEffect(() => {
    axios
      .get(`${API_URL}/tasks/${selectedProject}`)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    //eslint-disable-next-line
  }, [selectedProject, allTasks]);

  return (
    <>
      <div className="w-full">
        <MobileNavbar />
      </div>
      <CustomSnackbar
        value={snackbar.value}
        type={snackbar.type}
        message={snackbar.message}
      />
      <div>
        <Sidebar
          setShowProjectDialog={setShowProjectDialog}
          showProjectDialog={showProjectDialog}
        />
      </div>
      <div className="lg:ml-[15%]">
        <div className="sticky top-14 z-10">
          <CustomNavigation />
        </div>
        {showCreateModal && (
          <div>
            <CreateProject />
          </div>
        )}
        <div className="lg:mt-0">
          {showInviteModal && <InviteModal />}
          {showTicketModal.value && <TicketModal />}
        </div>

        <div className="px-3 lg:mt-0">
          <div>
            <CustomDialog
              open={showProjectDialog}
              setOpen={setShowProjectDialog}
              projects={projects}
            />
          </div>
          <CustomAccordion tasks={tasks} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
