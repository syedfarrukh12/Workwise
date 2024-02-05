import React, { useState, useEffect } from "react";
import { TaskStatus, camelCaseToSentenceCase } from "../utils";
import { animated, useSpring } from "@react-spring/web";
import { TextField, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { API_URL } from "../Common/apiConfig";
import { addTask, setOpenAlert, setShowTicket } from "../../redux/nonPersistant";
import CardSkeleton from "./CardSkeleton";
import Card from "./Card";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function BoardView({ tasks, loading }) {
  const dispatch = useDispatch();
  const theme = localStorage.getItem("theme");
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

  const [showAddTicket, setShowAddTicket] = useState({
    value: false,
    status: "",
  });
  const [title, setTitle] = useState("");
  const current_user = useSelector((state) => state.user.value);
  const selectedProject = useSelector(
    (state) => state.projects.selectedProject
  );

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

  const [tasksState, setTasksState] = useState({});
  
  useEffect(() => {
    // Initialize tasksState based on groupedTasks
    const groupedTasks = {};
    tasks.forEach((task) => {
      const { status } = task;
      if (!groupedTasks[status]) {
        groupedTasks[status] = [];
      }
      groupedTasks[status].push(task);
    });
    setTasksState(groupedTasks);
  }, [tasks]);

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

  return (
    <>
      <div className="flex overflow-x-auto overflow-y-hidden max-h-[83vh]">
        <DragDropContext onDragEnd={handleDragEnd}>
          {Object.values(TaskStatus).map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div className="ml-2" ref={provided.innerRef} {...provided.droppableProps}>
                  <animated.div
                    style={styles}
                    className={`flex flex-col p-3 w-[216px] justify-start overflow-y-auto h-[84vh] my-2 rounded-md ${
                      theme === "dark" ? "bg-[#223145]" : "bg-[#eaf2f8]"
                    }`}
                  >
                    <div className="font-semibold text-center">
                      <div className="flex justify-between">
                        <div className="flex space-x-2 items-start">
                          <Tooltip title={camelCaseToSentenceCase(status)}>
                            {status.length >= 15
                              ? camelCaseToSentenceCase(status.slice(0, 12) + "...")
                              : camelCaseToSentenceCase(status)}
                          </Tooltip>
                          {tasksState[status]?.length > 0 && (
                            <div className="bg-black/20 rounded-full px-2">
                              {tasksState[status]?.length}
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() =>
                            setShowAddTicket({
                              value: !showAddTicket.value,
                              status: status,
                            })
                          }
                          className="p-2 rounded-md hover:bg-[#a4b7c6] hover:text-[#000] w-5 h-5 flex items-center justify-center cursor-pointer"
                        >
                          {showAddTicket.value && showAddTicket.status === status ? (
                            <CloseIcon className="!w-5 !h-5" />
                          ) : (
                            <AddIcon className="!w-5 !h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="mt-1">
                      <div>
                        {showAddTicket.value && showAddTicket.status === status && (
                          <div className="flex items-center space-x-1">
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
                        )}
                      </div>
                    </div>
                    {loading ? (
                      <CardSkeleton />
                    ) : (
                      <div className="flex flex-col flex-grow overflow-auto">
                        {tasksState[status]?.length > 0 ? (
                          tasksState[status].map((task, index) => (
                            <Draggable key={task._id} draggableId={task._id} index={index}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <Card task={task} />
                                </div>
                              )}
                            </Draggable>
                          ))
                        ) : (
                          <div className="text-sm text-center">No tasks in this section</div>
                        )}
                      </div>
                    )}
                  </animated.div>
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </>
  );
}

export default BoardView;
