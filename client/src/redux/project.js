import { createSlice } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
  name: "project",
  initialState: {
    value: {
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      users: "",
      createdBy: "",
      createdAt: "",
    },
  },
  reducers: {
    addProject: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addProject } = projectSlice.actions;

export default projectSlice.reducer;
