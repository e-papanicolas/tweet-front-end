// import react and utils
import React from "react";
import { NavLink } from "react-router-dom";
import Icon from "@mui/material/Icon";
import "../styles/NavBar.css";
import logo from "../images/logo-grey.svg";
import lightLogo from "../images/logo-light-grey.svg";

function NavBar({ handleLogOut, user, switchTheme, theme }) {
  return (
    <div id="nav">
      <div className="logo">
        {theme === "light" ? (
          <img src={logo} alt="tweet stream logo" />
        ) : (
          <img src={lightLogo} alt="tweet stream logo" />
        )}

        <h1 id="nav-logo-title">TweetStream</h1>
      </div>
      <div className="first">
        <h3>Welcome, {user.first_name}</h3>
        <NavLink to="/me">
          <img
            className="profile-pic-preview"
            src={user.get_image}
            alt="profile"
          />
        </NavLink>
      </div>
      <nav className="nav vertical">
        <ul>
          <li>
            <NavLink to="/myevents">
              <Icon>home</Icon>
            </NavLink>
          </li>
          <li>
            <p>
              {theme === "dark" ? (
                <Icon onClick={switchTheme}>light_mode</Icon>
              ) : (
                <Icon onClick={switchTheme}>dark_mode</Icon>
              )}
            </p>
          </li>
          <li onClick={handleLogOut}>
            <p>
              <Icon>logout</Icon>
            </p>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
