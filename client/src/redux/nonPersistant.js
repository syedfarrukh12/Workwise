import { createSlice } from "@reduxjs/toolkit";

export const nonPersistantSlice = createSlice({
  name: "nonPersistant",
  initialState: {
   openAlert: {value: false, message: '', type: ''},
   showInvite: false,
   showTicket: false,
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
  },
});


export const { setOpenAlert, setShowInvite, setShowTicket } = nonPersistantSlice.actions;

export default nonPersistantSlice.reducer;
