import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import Login from "./Pages/Login/Login.jsx";
import { ThemeContext } from "./ThemeContext";
import { useContext, useEffect, useState } from "react";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Signup from "./Pages/signup/Signup";

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
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route
            exact
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            exact
            path="/signup"
            element={<Signup setIsLoggedIn={setIsLoggedIn} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
