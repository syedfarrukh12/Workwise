import { createSlice } from "@reduxjs/toolkit";

export const nonPersistantSlice = createSlice({
  name: "nonPersistant",
  initialState: {
    openAlert: { value: false, message: "", type: "error" },
    showInvite: false,
    showTicket: { value: false, type: "" },
    tasks: [],
    selectedTask: {},
    showTask: false,
    showCreateProject: { value: false, type: "" },
    projects: [],
    showProfile: false,
  },
  reducers: {
    setOpenAlert: (state, action) => {
      state.openAlert = action.payload;
    },
    setShowInvite: (state, action) => {
      state.showInvite = action.payload;
    },
    setShowTicket: (state, action) => {
      state.showTicket = action.payload;
    },
    setReduxTasks: (state, action) => {
      return {
        ...state,
        tasks: [...state.tasks, ...action.payload],
      };
    },
    addTask: (state, action) => {
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    },
    updateSelectedTask: (state, action) => {
      const updatedTask = action.payload;
      state.tasks = state.tasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      );
    },
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    deleteSelectedTask: (state, action) => {
      const updatedTasks = state.tasks.filter(
        (task) => task._id !== action.payload
      );
      return {
        ...state,
        tasks: updatedTasks,
      };
    },
    setShowTask: (state, action) => {
      state.showTask = action.payload;
    },
    setShowCreateProject: (state, action) => {
      state.showCreateProject = action.payload;
    },
    addProjects: (state, action) => {
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    },
    setProjects: (state, action) => {
      return {
        ...state,
        projects: [...state.projects, ...action.payload],
      };
    },
    setShowProfile: (state, action) => {
      state.showProfile = action.payload;
    },
  },
});

export const {
  setOpenAlert,
  setShowInvite,
  setShowTicket,
  addTask,
  setSelectedTask,
  deleteSelectedTask,
  setShowTask,
  setReduxTasks,
  updateSelectedTask,
  setShowCreateProject,
  addProjects,
  setProjects,
  setShowProfile,
} = nonPersistantSlice.actions;

export default nonPersistantSlice.reducer;
