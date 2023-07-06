import { createSlice } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    selectedProject: {}
  },
  reducers: {
    addProjects: (state, action) => {
      state.projects.push(action.payload);
    },
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
    }
  },
});

export const { addProjects, setSelectedProject } = projectSlice.actions;

export default projectSlice.reducer;
