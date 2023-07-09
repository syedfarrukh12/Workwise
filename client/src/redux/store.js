import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./user.js";
import projectsReducer from "./project.js";
import nonPersistant from "./nonPersistant.js";

const RESET_STORE = "RESET_STORE";
export const resetStore = () => ({
  type: RESET_STORE,
});

const rootReducer = (state, action) => {
  if (action.type === RESET_STORE) {
    // Reset the state to initial values
    state = undefined;
    // Clear the persisted data from storage
    storage.removeItem("persist:root");
  }

  return appReducer(state, action);
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "projects"],
};

const appReducer = combineReducers({
  user: userReducer,
  projects: projectsReducer,
  nonPersistant: nonPersistant,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
