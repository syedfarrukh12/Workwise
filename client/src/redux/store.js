import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./user.js";
import projectsReducer from "./project.js";
import nonPersistant from "./nonPersistant.js";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "projects"],
};

const rootReducer = combineReducers({
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
