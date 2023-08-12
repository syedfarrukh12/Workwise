import React, { useEffect, useState } from "react";
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
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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
      assignee: current_user._id,
      project: selectedProject._id,
    };
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
        setShowAddTicket({ value: false, status: "" });
      })
      .catch((error) => {
        dispatch(setOpenAlert({ value: true, message: error, type: "error" }));
      });
  };

  const [tasksState, setTasksState] = useState(groupedTasks);
  useEffect(() => {
    setTasksState(groupedTasks);
    //eslint-disable-next-line
  }, [tasks]);

  const handleDragEnd = (result) => {
    const { destination, source } = result;
  
    if (!destination) {
      return;
    }
  
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
  
    // Find the source section and destination section
    const sourceSection = tasksState[source.droppableId];
    const destinationSection = tasksState[destination.droppableId];
  
    // Get the task that was dragged
    const draggedTask = sourceSection[source.index];
  
    // Update the status of the dragged task
    const updatedDraggedTask = {
      ...draggedTask,
      status: destination.droppableId,
    };
  
    // Remove the task from the source list
    const updatedSourceSection = Array.from(sourceSection);
    updatedSourceSection.splice(source.index, 1);
  
    // Add the task to the destination list
    let updatedDestinationSection;
    if (destinationSection) {
      // Destination section exists, clone it and insert the dragged task
      updatedDestinationSection = Array.from(destinationSection);
      updatedDestinationSection.splice(destination.index, 0, updatedDraggedTask);
    } else {
      // Destination section is empty, create a new array with the dragged task
      updatedDestinationSection = [updatedDraggedTask];
    }
  
    // Update the state with the new task positions
    setTasksState((prevState) => ({
      ...prevState,
      [source.droppableId]: updatedSourceSection,
      [destination.droppableId]: updatedDestinationSection,
    }));
  
    // Make API call to update the task status
    axios
      .put(
        `${API_URL}/tasks/${selectedProject._id}/${updatedDraggedTask._id}`,
        updatedDraggedTask
      )
      .then((res) => {
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  return (
    <animated.div style={styles} className="px-3 !pb-3">
      <DragDropContext onDragEnd={handleDragEnd}>
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
            >
              <div className="flex items-center space-x-3">
                <Typography>{camelCaseToSentenceCase(status)}</Typography>
                <div
                  className={`rounded-full px-2 shadow-md ${
                    theme === "dark" ? "bg-[#27374D]" : "bg-[#DDE6ED]"
                  }`}
                >
                  {groupedTasks[status]?.length}
                </div>
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
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <Droppable droppableId={status} key={status}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {loading ? (
                      <TicketCardSkeleton />
                    ) : (
                      <>
                        {showAddTicket.value &&
                          showAddTicket.status === status && (
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
                        {tasksState[status]?.length > 0 ? (
                          tasksState[status].map((task, index) => (
                            <Draggable
                              key={task._id}
                              draggableId={task._id}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <TicketCard task={task} />
                                </div>
                              )}
                            </Draggable>
                          ))
                        ) : (
                          <div className="text-sm text-center">
                            No tasks in this section
                          </div>
                        )}
                      </>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </AccordionDetails>
          </Accordion>
        ))}
      </DragDropContext>
    </animated.div>
  );
}

export default CustomAccordion;
