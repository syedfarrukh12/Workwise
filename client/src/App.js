import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";
import { Suspense, useContext, useState } from "react";
import Navbar from "./Components/Navbar/Navbar.jsx";
import AppRoutes from "./utils/AppRoutes";
import { LinearProgress } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  const { theme } = useContext(ThemeContext);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("apiKey")
  );

  const muiTheme = createTheme({
    palette: {
      mode: theme === "dark" ? "dark" : "light",
    },
    typography: {
      fontSize: 14,
    },
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <div
        style={{
          backgroundColor: theme === "dark" ? "#27374D" : "#DDE6ED",
          color: theme === "dark" ? "#DDE6ED" : "#27374D",
          height: "100vh",
        }}
      >
        <Router>
          {isLoggedIn && (
            <>
              <Navbar setIsLoggedIn={setIsLoggedIn} />
            </>
          )}
          <div
            className={`${
              isLoggedIn ? "mt-14" : "mt-0"
            } text-sm ${theme === "dark" ? "bg-[#27374D]" : "bg-[#DDE6ED]"}`}
          >
            <Suspense fallback={<LinearProgress />}>
              <AppRoutes setIsLoggedIn={setIsLoggedIn} />
            </Suspense>
          </div>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
