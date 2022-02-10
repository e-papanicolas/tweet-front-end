import { NavLink } from "react-router-dom";
import React from "react";

function NavBar({ handleLogOut }) {
  //Style for navbar links
  const linkStyle = {
    color: "black",
    backgrounColor: "black",
    fontWeight: "bold",
    textDecoration: "none",
    cursor: "pointer",
  };

  return (
    <div className="navbar-container">
      <div className="user-info-container">
        <NavLink to="/">
          {/* <img src={logo} alt="logo" className="logo" /> */}
        </NavLink>
        <h1 id="name-of-app" style={{ color: "white" }}>
          final project app
        </h1>
      </div>

      <div className="nav-buttons">
        <ul>
          <li>
            <NavLink style={linkStyle} activestyle={{ color: "blue" }} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/me" style={linkStyle} activestyle={{ color: "blue" }}>
              My Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/boards"
              style={linkStyle}
              activestyle={{ color: "blue" }}
            >
              My Boards
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/friends"
              style={linkStyle}
              activestyle={{ color: "blue" }}
            >
              My Friends
            </NavLink>
          </li>
          <li>
            <p
              onClick={handleLogOut}
              style={linkStyle}
              className="log-out-button"
            >
              Log Out
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
