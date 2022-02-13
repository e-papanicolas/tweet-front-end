import { NavLink } from "react-router-dom";
import React from "react";
import "../index.css";

function NavBar({ handleLogOut }) {
  return (
    <div className="min-w-screen h-20 bg-gray-500 flex justify-between items-center p-50">
      <h1 className="text-2xl">final project app</h1>

      <div className="">
        <ul className="flex space-x-20 w-1000">
          <li>
            <NavLink className="text-white text-2xl" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="text-white text-2xl" to="/me">
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink className="text-white text-2xl" to="/boards">
              Boards
            </NavLink>
          </li>
          <li>
            <NavLink className="text-white text-2xl" to="/friends">
              Friends
            </NavLink>
          </li>
          <li
            onClick={handleLogOut}
            className="text-white text-2xl cursor-pointer"
          >
            Log Out
            {/* need hover icon for logout to match links */}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
