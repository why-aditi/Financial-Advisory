import React from "react";
import logo from "../Assets/Images/logo.svg";
import "./Nav.css";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        <img src={logo} alt="Bob World Logo" className="logo" />
      </a>
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
              <button className="btn btn-primary">Login</button>
            </a>
          </li>
          <li className="nav-item ml-2">
            <a className="nav-link" href="/signup">
              <button className="btn btn-secondary">Signup</button>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
