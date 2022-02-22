import React from "react";
import { NavLink } from "react-router-dom";
// import { UserContext } from "../App";
// import { useContext} from "react";

import "../App.css";
import Icon from "@mui/material/Icon";

function NavBar({ handleLogOut, user }) {
  // const user = useContext(UserContext);
  return (
    <div id="nav">
      <h1>
        <Icon className="material-icons">verified</Icon>
      </h1>

      <nav className="nav vertical">
        <ul>
          <li>
            <NavLink to="/">
              <Icon className="material-icons">home</Icon>
            </NavLink>
          </li>
          <li>
            <NavLink to="/me">
              <Icon className="material-icons">face</Icon>
            </NavLink>
          </li>
          <li onClick={handleLogOut}>
            <p>
              <Icon className="material-icons">logout</Icon>
            </p>
            {/* need hover icon for logout to match links */}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
