import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../Components/Common/apiConfig";
import { useDispatch, useSelector } from "react-redux";
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
import { setProjects, setReduxTasks } from "../../redux/nonPersistant";
import EditProject from "../../Components/ProjectComponents/CreateUpdateProject";
import UserProfile from "../../Components/UserProfile/UserProfile";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const showCreateModal = useSelector(
    (state) => state.nonPersistant.showCreateProject
  );
  const selectedProjectId = useSelector(
    (state) => state.projects.selectedProject?._id
  );
  const showInviteModal = useSelector(
    (state) => state.nonPersistant.showInvite
  );
  const showTicketModal = useSelector(
    (state) => state.nonPersistant.showTicket
  );
  const showUserProfile = useSelector(
    (state) => state.nonPersistant.showProfile
  );
  const projects = useSelector((state) => state.nonPersistant.projects);
  const snackbar = useSelector((state) => state.nonPersistant.openAlert);
  const allTasks = useSelector((state) => state.nonPersistant.tasks);
  const boardView = useSelector((state) => state.projects.showBoardView);
  

  const [showProjectDialog, setShowProjectDialog] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const showBoardView = boardView ?? false;
  const showTask = useSelector((state) => state.nonPersistant.showTask);

  useEffect(() => {
    if (!localStorage.getItem("apiKey")) {
      navigate("/login");
    }
    if (!selectedProjectId) setShowProjectDialog(true);
    axios
      .get(`${API_URL}/projects/${user._id}`)
      .then((response) => {
        dispatch(setProjects(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
    //eslint-disable-next-line
  }, [selectedProjectId]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/tasks/${selectedProjectId}`)
      .then((response) => {
        dispatch(setReduxTasks(response.data));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    //eslint-disable-next-line
  }, [selectedProjectId]);

  const filteredTasks = allTasks?.filter((task) => {
    return task.name?.toLowerCase().includes(query.toLocaleLowerCase());
  });

  return (
    <div className="h-screen overflow-auto">
      <div className="w-full mt-14">
        <MobileNavbar setShowProjectDialog={setShowProjectDialog} />
      </div>
      <CustomSnackbar
        value={snackbar.value}
        type={snackbar.type}
        message={snackbar.message}
      />
      {showTask && <TicketDetails />}
      {showUserProfile && <UserProfile />}

      <div>
        <Sidebar setShowProjectDialog={setShowProjectDialog} />
      </div>

      <div className="lg:ml-[15%]">
        <div className="sticky top-[50px] md:top-[54px] z-10">
          <CustomNavigation setQuery={setQuery} query={query} />
        </div>
        {showCreateModal.value && (
          <div>
            <EditProject />
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

          <div className="mt-3">
            {showBoardView ? (
              <BoardView tasks={filteredTasks} loading={loading} />
            ) : (
              <CustomAccordion tasks={filteredTasks} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
