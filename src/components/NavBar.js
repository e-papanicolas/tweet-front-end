// import react and utils
import React from "react";
import { NavLink } from "react-router-dom";
import Icon from "@mui/material/Icon";
// import { UserContext } from "../App";
// import { useContext} from "react";
import "../App.css";

function NavBar({ handleLogOut, user }) {
  // const user = useContext(UserContext);
  return (
    <div id="nav">
      <h1>
        <Icon>tag</Icon>
      </h1>

      <nav className="nav vertical">
        <ul>
          <li>
            <NavLink to="/myevents">
              <Icon>home</Icon>
            </NavLink>
          </li>
          <li>
            <NavLink to="/me">
              <Icon>face</Icon>
            </NavLink>
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
