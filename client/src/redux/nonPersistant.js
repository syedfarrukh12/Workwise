import { createSlice } from "@reduxjs/toolkit";

export const nonPersistantSlice = createSlice({
  name: "nonPersistant",
  initialState: {
    openAlert: { value: false, message: "", type: "" },
    showInvite: false,
    showTicket: {value:false, type: ''},
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
  },
});

export const {
  setOpenAlert,
  setShowInvite,
  setShowTicket,
  addTask,
  setSelectedTask,
} = nonPersistantSlice.actions;

export default nonPersistantSlice.reducer;
