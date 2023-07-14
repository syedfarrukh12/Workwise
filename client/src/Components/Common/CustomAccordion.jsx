import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  Typography,
} from "@mui/material";
import TicketCard from "../TicketCard/TicketCard";
import { TaskStatus, camelCaseToSentenceCase } from "../utils";
import { animated, useSpring } from "@react-spring/web";
import TicketCardSkeleton from "../TicketCard/TicketCardSkeleton";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "./apiConfig";
import {
  addTask,
  setOpenAlert,
  setShowTicket,
} from "../../redux/nonPersistant";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

function CustomAccordion({ tasks, loading }) {
  const groupedTasks = {};
  const theme = localStorage.getItem("theme");

  tasks.forEach((task) => {
    const { status } = task;
    if (!groupedTasks[status]) {
      groupedTasks[status] = [];
    }
    groupedTasks[status].push(task);
  });
  const dispatch = useDispatch();
  const [showAddTicket, setShowAddTicket] = useState({
    value: false,
    status: "",
  });
  const [hover, setHover] = useState({ value: false, status: "" });
  const [title, setTitle] = useState("");
  const current_user = useSelector((state) => state.user.value);
  const selectedProject = useSelector(
    (state) => state.projects.selectedProject
  );
  const styles = useSpring({
    from: {
      opacity: 0,
      transform: "translateY(-10px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
    config: {
      duration: 500,
      delay: 100,
    },
  });

  const handleSubmit = (status) => {
    const ticket = {
      name: title,
      status: status,
      assignee: current_user.id,
      project: selectedProject._id,
    };
    console.log(ticket);
    axios
      .post(`${API_URL}/task`, ticket)
      .then((response) => {
        dispatch(
          setOpenAlert({
            value: true,
            message: "Ticket Created Successfully",
            type: "success",
          })
        );
        dispatch(setShowTicket({ value: false, type: "" }));
        dispatch(addTask(response.data));
      })
      .catch((error) => {
        dispatch(setOpenAlert({ value: true, message: error, type: "error" }));
      });
  };

  console.log(groupedTasks["new"]);
  return (
    <animated.div style={styles} className="px-3">
      {Object.values(TaskStatus).map((status) => (
        <Accordion
          onMouseEnter={() => setHover({ value: true, status: status })}
          onMouseLeave={() => {
            setHover({ value: false, status: "" });
            setShowAddTicket({ value: false, status: "" });
          }}
          style={{
            backgroundColor: theme === "dark" ? "#27374D" : "#eaf2f8",
            border: "none",
            boxShadow: "none",
            borderRadius: "10px",
            marginTop: "5px",
          }}
          key={status}
          defaultExpanded
          TransitionProps={{ unmountOnExit: true }}
        >
          <AccordionSummary
            expandIcon={<ExpandCircleDownOutlinedIcon />}
            aria-controls={`${status}-content`}
            id={`${status}-header`}
            className="flex items-center space-x-3 justify-start"
          >
            <Typography>{camelCaseToSentenceCase(status)}</Typography>
            {hover.value && hover.status === status && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAddTicket({ value: true, status: status });
                }}
                className="p-2 ml-5 rounded-md hover:bg-[#a4b7c6] hover:text-[#000] w-5 h-5 flex items-center justify-center cursor-pointer"
              >
                <AddIcon className="!w-5 !h-5" />
              </button>
            )}
          </AccordionSummary>
          <AccordionDetails>
            {loading ? (
              <TicketCardSkeleton />
            ) : (
              <>
                {showAddTicket.value && showAddTicket.status === status && (
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center space-x-1 w-full lg:w-[30%] ">
                      <TextField
                        size="small"
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                        type="text"
                        className="w-full p-1 border rounded-md bg-transparent focus:outline-none"
                        placeholder="Ticket Title"
                        variant="outlined"
                      />
                      <button
                        onClick={() => handleSubmit(status)}
                        className="p-2 rounded-md hover:bg-[#a4b7c6] hover:text-[#000] w-5 h-5 flex items-center justify-center cursor-pointer"
                      >
                        <AddIcon className="!w-5 !h-5" />
                      </button>
                    </div>
                    <div
                      onClick={() =>
                        setShowAddTicket({ value: false, status: "" })
                      }
                    >
                      <CloseOutlinedIcon className="!w-5 !h-5 cursor-pointer" />
                    </div>
                  </div>
                )}
                {groupedTasks[status]?.length > 0 ? (
                  groupedTasks[status].map((task) => (
                    <div key={task._id}>
                      <TicketCard task={task} />
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-center">
                    No tasks in this section
                  </div>
                )}
              </>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </animated.div>
  );
}

export default CustomAccordion;
