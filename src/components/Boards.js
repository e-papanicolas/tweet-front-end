import React from "react";
import { ActionCableProvider } from "react-actioncable-provider";
import Event from "./Event";
import NewBoardForm from "./NewBoardForm";
// import { UserContext } from "../App";
// import { useContext} from "react";
import "../App.css";
import Icon from "@mui/material/Icon";

function Boards({ user }) {
  // const user = useContext(UserContext);

  // if user has no events, only offer to add new
  if (!user.events) {
    return (
      <div id="board-container">
        <p>You don't have any boards right now</p>
        <p>Click to add one now.</p>
        {/* TODO: add button and click handle to add new form here */}
        <Icon className="material-icons" id="icon-large">
          edit_calendar
        </Icon>
      </div>
    );
  }

  // if user has boards, map over and render Event component for each, inside ActionCableProvider
  return (
    <div id="boards-container">
      <div className="welcome">
        <p>welcome, {user.first_name}</p>
        {/* add same button as above for onclick to new event form */}
        <Icon className="material-icons" id="icon-med">
          edit_calendar
        </Icon>
      </div>
      <div>
        {/* <ActionCableProvider url="ws://localhost:3000/cable">
          <Event />
        </ActionCableProvider> */}
      </div>
    </div>
  );
}

export default Boards;
