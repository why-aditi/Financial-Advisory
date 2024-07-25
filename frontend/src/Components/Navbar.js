import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "@mui/material";
import logo from "../Assets/Images/logo.svg";
import "./Nav.css";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        <img src={logo} alt="Bob World Logo" className="logo" />
      </a>
      <div className="button_ls">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/login">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#00248E",
                    "&:hover": { backgroundColor: "#001F5C" },
                  }}
                >
                  Login
                </Button>
              </a>
            </li>
            <li className="nav-item ml-2">
              <a className="nav-link" href="/signup">
                <Button variant="outlined">Signup</Button>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
