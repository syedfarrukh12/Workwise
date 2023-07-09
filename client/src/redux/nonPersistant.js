import { createSlice } from "@reduxjs/toolkit";

export const nonPersistantSlice = createSlice({
  name: "nonPersistant",
  initialState: {
    openAlert: { value: false, message: "", type: "" },
    showInvite: false,
    showTicket: false,
    tasks: []
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
  },
});

export const { setOpenAlert, setShowInvite, setShowTicket, addTask } =
  nonPersistantSlice.actions;

export default nonPersistantSlice.reducer;
