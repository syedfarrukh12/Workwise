import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";
import { Suspense, useContext, useState } from "react";
import Navbar from "./Components/Navbar/Navbar.jsx";
import AppRoutes from "./utils/AppRoutes";
import { LinearProgress } from "@mui/material";

function App() {
  const { theme } = useContext(ThemeContext);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("apiKey")
  );

  return (
    <div
      style={{
        backgroundColor: theme === "dark" ? "#333" : "#fff",
        color: theme === "dark" ? "#fff" : "#333",
        height: "100vh",
      }}
    >
      <Router>
        {isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} />}
        <Suspense fallback={<LinearProgress />}>
          <AppRoutes setIsLoggedIn={setIsLoggedIn} />
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
