import { createSlice } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
  name: "projects",
  initialState: {
    selectedProject: {},
    showBoardView: false,
  },
  reducers: {
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
    },
    setShowBoardView: (state, action) => {
      state.showBoardView = action.payload;
    },
  },
});

export const { addProjects, setSelectedProject, setShowBoardView } =
  projectSlice.actions;

export default projectSlice.reducer;
