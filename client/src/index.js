import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./ThemeContext";
import reportWebVitals from "./reportWebVitals";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
