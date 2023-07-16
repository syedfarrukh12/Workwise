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
import BoardView from "../../Components/BoardView/BoardView";
import TicketDetails from "../../Components/TicketDetails/TicketDetails";

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
  const boardView = useSelector((state) => state.projects.showBoardView);
  const [tasks, setTasks] = useState([]);
  const [showProjectDialog, setShowProjectDialog] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const showBoardView = boardView ?? false;
  const showTask = useSelector((state) => state.nonPersistant.showTask);

  useEffect(() => {
    if (!localStorage.getItem("apiKey")) {
      navigate("/login");
    }
    if (!selectedProject) setShowProjectDialog(true);
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
    setLoading(true);
    axios
      .get(`${API_URL}/tasks/${selectedProject}`)
      .then((response) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    //eslint-disable-next-line
  }, [selectedProject, allTasks]);

  const filteredTasks = tasks.filter((task) => {
    return task.name.toLowerCase().includes(query.toLocaleLowerCase());
  });
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
      {showTask && <TicketDetails />}

      <div>
        <Sidebar setShowProjectDialog={setShowProjectDialog} />
      </div>
      <div className="lg:ml-[15%]">
        <div className="sticky top-14 z-10">
          <CustomNavigation setQuery={setQuery} query={query} />
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

        <div className="lg:mt-0">
          <div>
            <CustomDialog
              open={showProjectDialog}
              setOpen={setShowProjectDialog}
              projects={projects}
            />
          </div>

          {showBoardView ? (
            <div>
              <BoardView tasks={filteredTasks} loading={loading} />
            </div>
          ) : (
            <CustomAccordion tasks={filteredTasks} loading={loading} />
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
