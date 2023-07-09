import { createSlice } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    selectedProject: {},
    showCreateProject: false
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
    }
  },
});


export const { addProjects, setSelectedProject, setShowCreateProject } = projectSlice.actions;

export default projectSlice.reducer;
