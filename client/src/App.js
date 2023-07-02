import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard.tsx";
import { ThemeContext } from "./ThemeContext";
import { useContext } from "react";
import Navbar from "./Components/Navbar/Navbar.tsx";

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      style={{
        backgroundColor: theme === "dark" ? "#333" : "#fff",
        color: theme === "dark" ? "#fff" : "#333",
        height: "100vh",
      }}
    >
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
