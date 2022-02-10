import { NavLink } from "react-router-dom";
import React from "react";
import "../styles/NavBar.css";

function NavBar({ handleLogOut }) {
  return (
    <div className="navbar-container">
      <h1 id="name-of-app">final project app</h1>

      <div className="nav-buttons">
        <ul>
          <li>
            <NavLink className="navlink" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="navlink" to="/me">
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink className="navlink" to="/boards">
              Boards
            </NavLink>
          </li>
          <li>
            <NavLink className="navlink" to="/friends">
              Friends
            </NavLink>
          </li>
          <li onClick={handleLogOut} className="log-out-button">
            Log Out
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
