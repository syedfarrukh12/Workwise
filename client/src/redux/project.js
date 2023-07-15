import { createSlice } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    selectedProject: {},
    showCreateProject: false,
    showBoardView: false,
  },
  reducers: {
    addProjects: (state, action) => {
      state.projects = action.payload;
    },
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
    },
    setShowCreateProject: (state, action) => {
      state.showCreateProject = action.payload;
    },
    setShowBoardView: (state, action) => {
      state.showBoardView = action.payload;
    },
  },
});

export const {
  addProjects,
  setSelectedProject,
  setShowCreateProject,
  setShowBoardView,
} = projectSlice.actions;

export default projectSlice.reducer;
