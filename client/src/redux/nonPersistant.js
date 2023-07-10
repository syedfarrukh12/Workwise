import { createSlice } from "@reduxjs/toolkit";

export const nonPersistantSlice = createSlice({
  name: "nonPersistant",
  initialState: {
    openAlert: { value: false, message: "", type: "" },
    showInvite: false,
    showTicket: { value: false, type: "" },
    tasks: [],
    selectedTask: {},
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
    addTask: (state, action) => {
      state.tasks.push(action.payload);
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
  },
});

export const {
  setOpenAlert,
  setShowInvite,
  setShowTicket,
  addTask,
  setSelectedTask,
  deleteSelectedTask,
} = nonPersistantSlice.actions;

export default nonPersistantSlice.reducer;
