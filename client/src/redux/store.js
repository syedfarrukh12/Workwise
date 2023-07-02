import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import projectReducer from "./project";
export const store = configureStore({
  reducer: {
    user: userReducer,
    project: projectReducer,
  },
});
