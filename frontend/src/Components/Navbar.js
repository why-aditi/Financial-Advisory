import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@mui/material";
import logo from "../Assets/Images/logo.svg";
import "./Nav.css";

export default function Navbar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        <img src={logo} alt="Bob World Logo" className="logo" />
      </a>
      <div className="">
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggle}
          aria-controls="navbarNav"
          aria-expanded={!isCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${
            isCollapsed ? "collapse" : "show"
          }`}
          id="navbarNav"
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/login">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#007BFF", // Adjusted for dark theme
                    color: "#FFFFFF", // Text color for visibility
                    "&:hover": { backgroundColor: "#0056b3" }, // Darker shade on hover
                  }}
                >
                  Login
                </Button>
              </a>
            </li>
            <li className="nav-item ml-2">
              <a className="nav-link" href="/signup">
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "#007BFF",
                    color: "#007BFF",
                    "&:hover": { borderColor: "#0056b3", color: "#0056b3" },
                  }}
                >
                  Signup
                </Button>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
